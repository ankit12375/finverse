import { getUncachableGitHubClient } from './github-client';

interface ProjectFile {
  path: string;
  content: string;
}

interface ProjectInfo {
  id: number;
  title: string;
  description: string;
  techStack: string[];
}

async function getProjectData(): Promise<ProjectInfo[]> {
  const { projects } = await import('../server/project-data');
  return projects.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    techStack: p.techStack,
  }));
}

async function getFilesForProject(projectId: number): Promise<ProjectFile[]> {
  const { getProjectFiles } = await import('../server/project-templates');
  return getProjectFiles(projectId);
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

async function ensureRepoInitialized(octokit: any, owner: string, repoName: string, project: ProjectInfo) {
  let hasCommits = false;
  try {
    await octokit.git.getRef({ owner, repo: repoName, ref: 'heads/main' });
    hasCommits = true;
  } catch (e: any) {
    if (e.status === 409 || e.status === 404) {
      hasCommits = false;
    } else {
      throw e;
    }
  }

  if (!hasCommits) {
    console.log(`  Initializing empty repo with README...`);
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo: repoName,
      path: 'README.md',
      message: `Initialize repository: ${project.title}`,
      content: Buffer.from(`# ${project.title}\n\n${project.description}\n`).toString('base64'),
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`  Repo initialized.`);
  }
}

async function createAndPushRepo(project: ProjectInfo) {
  const octokit = await getUncachableGitHubClient();
  const repoName = slugify(project.title);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing: ${project.title}`);
  console.log(`Repo name: ${repoName}`);
  console.log(`${'='.repeat(60)}`);

  const { data: user } = await octokit.users.getAuthenticated();
  const owner = user.login;
  console.log(`Authenticated as: ${owner}`);

  let repoExists = false;
  try {
    await octokit.repos.get({ owner, repo: repoName });
    repoExists = true;
    console.log(`Repository ${repoName} already exists.`);
  } catch (e: any) {
    if (e.status !== 404) throw e;
  }

  if (!repoExists) {
    const topicDescription = project.description.length > 350 
      ? project.description.substring(0, 347) + '...' 
      : project.description;
    
    await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: topicDescription,
      auto_init: false,
      private: false,
    });
    console.log(`Created repository: ${repoName}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await ensureRepoInitialized(octokit, owner, repoName, project);

  const files = await getFilesForProject(project.id);
  if (!files.length) {
    console.log(`No template files found for project ${project.id}, skipping.`);
    return;
  }

  const { data: ref } = await octokit.git.getRef({
    owner,
    repo: repoName,
    ref: 'heads/main',
  });
  const latestCommitSha = ref.object.sha;

  const { data: lastCommit } = await octokit.git.getCommit({
    owner,
    repo: repoName,
    commit_sha: latestCommitSha,
  });
  const baseTreeSha = lastCommit.tree.sha;

  const blobs = [];
  for (const file of files) {
    const { data: blob } = await octokit.git.createBlob({
      owner,
      repo: repoName,
      content: Buffer.from(file.content).toString('base64'),
      encoding: 'base64',
    });
    blobs.push({ path: file.path, sha: blob.sha });
    console.log(`  Created blob for: ${file.path}`);
  }

  const treeItems = blobs.map(b => ({
    path: b.path,
    mode: '100644' as const,
    type: 'blob' as const,
    sha: b.sha,
  }));

  const { data: tree } = await octokit.git.createTree({
    owner,
    repo: repoName,
    tree: treeItems,
    base_tree: baseTreeSha,
  });
  console.log(`  Created tree: ${tree.sha}`);

  const { data: commit } = await octokit.git.createCommit({
    owner,
    repo: repoName,
    message: `Add project files: ${project.title}\n\n${project.description}`,
    tree: tree.sha,
    parents: [latestCommitSha],
  });
  console.log(`  Created commit: ${commit.sha}`);

  await octokit.git.updateRef({
    owner,
    repo: repoName,
    ref: 'heads/main',
    sha: commit.sha,
  });
  console.log(`  Updated ref heads/main`);

  try {
    const topicDescription = project.description.length > 350 
      ? project.description.substring(0, 347) + '...' 
      : project.description;
    await octokit.repos.update({
      owner,
      repo: repoName,
      description: topicDescription,
    });
  } catch {}

  const topics = project.techStack
    .map(t => t.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/\s+/g, '-'))
    .filter(t => t.length > 0 && t.length <= 35)
    .slice(0, 10);

  try {
    await octokit.repos.replaceAllTopics({
      owner,
      repo: repoName,
      names: topics,
    });
    console.log(`  Set topics: ${topics.join(', ')}`);
  } catch (e: any) {
    console.log(`  Warning: Could not set topics: ${e.message}`);
  }

  console.log(`Successfully pushed: ${project.title} -> github.com/${owner}/${repoName}`);
}

async function main() {
  console.log('Starting GitHub Portfolio Push...\n');
  
  const projects = await getProjectData();
  console.log(`Found ${projects.length} projects to push.\n`);

  for (const project of projects) {
    try {
      await createAndPushRepo(project);
    } catch (error: any) {
      console.error(`\nERROR pushing ${project.title}: ${error.message}`);
      if (error.response?.data) {
        console.error('API response:', JSON.stringify(error.response.data, null, 2));
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('All projects processed!');
  console.log('='.repeat(60));
}

main().catch(console.error);
