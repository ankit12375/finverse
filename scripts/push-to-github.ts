import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function main() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });

  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);

  const repoName = 'finverse';
  const owner = user.login;

  try {
    await octokit.repos.get({ owner, repo: repoName });
    console.log(`Repository ${repoName} exists`);
  } catch (e: any) {
    if (e.status === 404) {
      console.log(`Creating repository ${repoName}...`);
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: 'FinVerse - A vibe coded gamified financial intelligence platform with immersive animations, XP system, quests, and leaderboards',
        private: false,
        auto_init: false,
      });
      console.log(`Repository ${repoName} created!`);
    } else {
      throw e;
    }
  }

  let isEmpty = false;
  try {
    await octokit.git.getRef({ owner, repo: repoName, ref: 'heads/main' });
  } catch (e: any) {
    if (e.status === 409 || e.status === 404) {
      isEmpty = true;
    }
  }

  if (isEmpty) {
    console.log('Repository is empty, initializing with README...');
    const readmeContent = fs.readFileSync('/home/runner/workspace/README.md', 'utf-8');
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: repoName,
      path: 'README.md',
      message: 'Initial commit',
      content: Buffer.from(readmeContent).toString('base64'),
    });
    console.log('Repository initialized!');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  const { data: ref } = await octokit.git.getRef({ owner, repo: repoName, ref: 'heads/main' });
  const baseSha = ref.object.sha;
  console.log(`Main branch at: ${baseSha}`);

  const ignoreDirs = new Set(['node_modules', '.git', '.cache', 'dist', '.local', '.config', '.upm', 'attached_assets', 'references']);
  const ignoreFiles = new Set(['.gitignore', '.replit', 'replit.nix', 'generated-icon.png', 'replit.md']);

  function getAllFiles(dir: string, base: string = ''): { path: string; content: string }[] {
    const files: { path: string; content: string }[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = base ? `${base}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        if (ignoreDirs.has(entry.name)) continue;
        files.push(...getAllFiles(fullPath, relativePath));
      } else {
        if (ignoreFiles.has(entry.name)) continue;
        if (entry.name.startsWith('.') && entry.name !== '.gitignore') continue;
        try {
          const content = fs.readFileSync(fullPath);
          const base64 = content.toString('base64');
          files.push({ path: relativePath, content: base64 });
        } catch (err) {
          console.log(`Skipping ${relativePath}: ${err}`);
        }
      }
    }
    return files;
  }

  console.log('Collecting files...');
  const projectDir = '/home/runner/workspace';
  const allFiles = getAllFiles(projectDir);
  console.log(`Found ${allFiles.length} files to push`);

  console.log('Creating blobs...');
  const treeItems: any[] = [];

  const BATCH_SIZE = 10;
  for (let i = 0; i < allFiles.length; i += BATCH_SIZE) {
    const batch = allFiles.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (file) => {
        const { data: blob } = await octokit.git.createBlob({
          owner,
          repo: repoName,
          content: file.content,
          encoding: 'base64',
        });
        return { path: file.path, sha: blob.sha };
      })
    );

    for (const result of results) {
      treeItems.push({
        path: result.path,
        mode: '100644' as const,
        type: 'blob' as const,
        sha: result.sha,
      });
    }
    console.log(`  Uploaded ${Math.min(i + BATCH_SIZE, allFiles.length)}/${allFiles.length} files`);
  }

  console.log('Creating tree...');
  const { data: tree } = await octokit.git.createTree({
    owner,
    repo: repoName,
    tree: treeItems,
  });

  console.log('Creating commit...');
  const { data: commit } = await octokit.git.createCommit({
    owner,
    repo: repoName,
    message: 'FinVerse - Vibe coded gamified financial intelligence platform\n\nFull single-page app with particle effects, glitch animations,\ngamification (XP, levels, achievements, quests, leaderboard),\nanimated charts, and dark neon theme.\n\nVibe coded with AI.',
    tree: tree.sha,
    parents: [baseSha],
  });

  console.log('Updating ref...');
  await octokit.git.updateRef({
    owner,
    repo: repoName,
    ref: 'heads/main',
    sha: commit.sha,
    force: true,
  });

  console.log(`\nPushed successfully to https://github.com/${owner}/${repoName}`);
}

main().catch(console.error);
