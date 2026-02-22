export interface ProjectFile {
  path: string;
  content: string;
}

export function getProjectFiles(projectId: number): ProjectFile[] {
  switch (projectId) {
    case 1:
      return getAICodeReviewFiles();
    case 2:
      return getBankingPaymentFiles();
    case 3:
      return getAPIPlaygroundFiles();
    case 4:
      return getMicroservicesMonitorFiles();
    case 5:
      return getGenAIPipelineFiles();
    case 6:
      return getAnalyticsDashboardFiles();
    case 7:
      return getCopilotBotFiles();
    case 8:
      return getErrorMonitorFiles();
    case 9:
      return getAIChatFiles();
    case 10:
      return getCICDVisualizerFiles();
    case 11:
      return getDocumentIntelligenceFiles();
    case 12:
      return getFraudDetectionFiles();
    case 13:
      return getAPIGatewayFiles();
    case 14:
      return getTelecomDashboardFiles();
    case 15:
      return getCodeMigrationFiles();
    default:
      return [];
  }
}

function getAICodeReviewFiles(): ProjectFile[] {
  return [
    {
      path: "README.md",
      content: `# AI Code Review Dashboard

A production-grade code review platform that leverages AI to analyze pull requests, suggest improvements, detect bugs, and enforce coding standards.

## Tech Stack
- **Frontend:** React + TypeScript + TailwindCSS
- **Backend:** Node.js + Express
- **AI:** OpenAI API for code analysis
- **Real-time:** WebSocket for live collaboration

## Getting Started

\`\`\`bash
npm install
cp .env.example .env  # Add your OpenAI API key
npm run dev
\`\`\`

## Features
- AI-powered code analysis with contextual suggestions
- Real-time collaborative review with WebSocket
- Code quality scoring dashboard with charts
- Multi-language syntax highlighting
- Git diff viewer with inline annotations

## Architecture
\`\`\`
src/
├── client/          # React frontend
│   ├── components/  # UI components
│   ├── hooks/       # Custom hooks
│   └── pages/       # Page components
├── server/          # Express backend
│   ├── routes/      # API routes
│   ├── services/    # Business logic
│   └── ai/          # AI integration
└── shared/          # Shared types
\`\`\`

## Author
Ankit Sharma - Java Backend Developer | AI Enthusiast
`,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "ai-code-review-dashboard",
          version: "1.0.0",
          scripts: {
            dev: "concurrently \"npm run server\" \"npm run client\"",
            server: "tsx watch src/server/index.ts",
            client: "vite",
            build: "vite build && tsc -p tsconfig.server.json",
          },
          dependencies: {
            express: "^4.18.2",
            openai: "^4.20.0",
            ws: "^8.16.0",
            react: "^18.2.0",
            "react-dom": "^18.2.0",
            recharts: "^2.10.0",
            "highlight.js": "^11.9.0",
          },
          devDependencies: {
            typescript: "^5.3.0",
            vite: "^5.0.0",
            "@vitejs/plugin-react": "^4.2.0",
            tailwindcss: "^3.4.0",
            tsx: "^4.7.0",
            concurrently: "^8.2.0",
          },
        },
        null,
        2
      ),
    },
    {
      path: ".env.example",
      content: `OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
WS_PORT=3001
`,
    },
    {
      path: "src/server/index.ts",
      content: `import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { reviewRouter } from "./routes/review";
import { aiService } from "./services/ai-service";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

app.use(express.json());
app.use("/api/reviews", reviewRouter);

wss.on("connection", (ws) => {
  console.log("Client connected for real-time review");
  ws.on("message", async (data) => {
    const { type, payload } = JSON.parse(data.toString());
    if (type === "review-code") {
      const suggestions = await aiService.analyzeCode(payload.code, payload.language);
      ws.send(JSON.stringify({ type: "suggestions", data: suggestions }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`,
    },
    {
      path: "src/server/services/ai-service.ts",
      content: `import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const aiService = {
  async analyzeCode(code: string, language: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: \`You are an expert code reviewer. Analyze the following \${language} code and provide:
          1. Bug detection with severity levels
          2. Performance improvement suggestions
          3. Security vulnerability checks
          4. Code style and best practice recommendations
          Return as structured JSON.\`,
        },
        { role: "user", content: code },
      ],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || "{}");
  },

  async generateQualityScore(code: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Rate the code quality from 0-100 across: readability, maintainability, performance, security. Return JSON.",
        },
        { role: "user", content: code },
      ],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || "{}");
  },
};
`,
    },
    {
      path: "src/server/routes/review.ts",
      content: `import { Router } from "express";
import { aiService } from "../services/ai-service";

export const reviewRouter = Router();

reviewRouter.post("/analyze", async (req, res) => {
  try {
    const { code, language } = req.body;
    const analysis = await aiService.analyzeCode(code, language);
    const score = await aiService.generateQualityScore(code);
    res.json({ analysis, score });
  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
});

reviewRouter.get("/history", async (_req, res) => {
  res.json({ reviews: [] });
});
`,
    },
  ];
}

function getBankingPaymentFiles(): ProjectFile[] {
  return [
    {
      path: "README.md",
      content: `# Banking Payment Flow Simulator

A comprehensive payment processing simulator built with microservices patterns reflecting modern core banking modernization.

## Tech Stack
- Node.js + Express + TypeScript
- PostgreSQL for transaction storage
- Redis for caching and rate limiting
- Swagger for API documentation

## Getting Started
\`\`\`bash
npm install
docker-compose up -d  # Start PostgreSQL and Redis
npm run dev
\`\`\`

## Services
- **Payment Gateway** - Payment initiation and validation
- **Fraud Detection** - Rule-based fraud engine
- **Settlement** - Transaction settlement processing

## API Endpoints
- POST /api/payments - Initiate payment
- GET /api/payments/:id - Get payment status
- POST /api/payments/:id/validate - Validate payment
- GET /api/payments/history - Transaction history

## Author
Ankit Sharma - Banking Domain Expert | Danske Bank
`,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "banking-payment-simulator",
          version: "1.0.0",
          scripts: {
            dev: "tsx watch src/index.ts",
            build: "tsc",
            test: "jest",
          },
          dependencies: {
            express: "^4.18.2",
            pg: "^8.11.0",
            ioredis: "^5.3.0",
            "swagger-ui-express": "^5.0.0",
            uuid: "^9.0.0",
            zod: "^3.22.0",
          },
          devDependencies: {
            typescript: "^5.3.0",
            tsx: "^4.7.0",
            jest: "^29.7.0",
            "@types/express": "^4.17.21",
          },
        },
        null,
        2
      ),
    },
    {
      path: "src/index.ts",
      content: `import express from "express";
import { paymentRouter } from "./routes/payments";
import { fraudEngine } from "./services/fraud-detection";
import { settlementService } from "./services/settlement";

const app = express();
app.use(express.json());
app.use("/api/payments", paymentRouter);

app.listen(3000, () => console.log("Payment Simulator running on port 3000"));
`,
    },
    {
      path: "src/routes/payments.ts",
      content: `import { Router } from "express";
import { v4 as uuid } from "uuid";
import { fraudEngine } from "../services/fraud-detection";
import { settlementService } from "../services/settlement";
import { PaymentSchema } from "../types/payment";

export const paymentRouter = Router();

paymentRouter.post("/", async (req, res) => {
  const parsed = PaymentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const payment = {
    id: uuid(),
    ...parsed.data,
    status: "INITIATED",
    createdAt: new Date().toISOString(),
  };

  const fraudCheck = await fraudEngine.evaluate(payment);
  if (fraudCheck.blocked) {
    return res.status(403).json({ error: "Payment blocked by fraud detection", reason: fraudCheck.reason });
  }

  const settled = await settlementService.process(payment);
  res.status(201).json(settled);
});

paymentRouter.get("/:id", async (req, res) => {
  res.json({ id: req.params.id, status: "COMPLETED" });
});
`,
    },
    {
      path: "src/services/fraud-detection.ts",
      content: `interface Payment {
  amount: number;
  currency: string;
  senderAccount: string;
  receiverAccount: string;
}

interface FraudResult {
  blocked: boolean;
  score: number;
  reason?: string;
}

export const fraudEngine = {
  async evaluate(payment: Payment): Promise<FraudResult> {
    const rules = [
      { check: () => payment.amount > 100000, reason: "Amount exceeds threshold", weight: 80 },
      { check: () => payment.senderAccount === payment.receiverAccount, reason: "Self-transfer detected", weight: 90 },
      { check: () => payment.currency !== "USD" && payment.amount > 50000, reason: "High-value foreign currency", weight: 60 },
    ];

    let totalScore = 0;
    const triggeredReasons: string[] = [];

    for (const rule of rules) {
      if (rule.check()) {
        totalScore += rule.weight;
        triggeredReasons.push(rule.reason);
      }
    }

    return {
      blocked: totalScore >= 80,
      score: Math.min(totalScore, 100),
      reason: triggeredReasons.join("; "),
    };
  },
};
`,
    },
    {
      path: "src/services/settlement.ts",
      content: `export const settlementService = {
  async process(payment: any) {
    // Simulate settlement processing
    await new Promise((r) => setTimeout(r, 100));
    return {
      ...payment,
      status: "SETTLED",
      settledAt: new Date().toISOString(),
      reference: \`STL-\${Date.now()}\`,
    };
  },
};
`,
    },
    {
      path: "src/types/payment.ts",
      content: `import { z } from "zod";

export const PaymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
  senderAccount: z.string().min(10),
  receiverAccount: z.string().min(10),
  description: z.string().optional(),
});

export type Payment = z.infer<typeof PaymentSchema>;
`,
    },
  ];
}

function getAPIPlaygroundFiles(): ProjectFile[] {
  return [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>REST API Playground</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f172a;--surface:#1e293b;--border:#334155;--text:#e2e8f0;--text-muted:#94a3b8;--primary:#3b82f6;--success:#22c55e;--error:#ef4444;--warning:#f59e0b;--radius:8px;--font:system-ui,-apple-system,sans-serif;--mono:'Fira Code',monospace}
body{background:var(--bg);color:var(--text);font-family:var(--font);min-height:100vh;display:flex;flex-direction:column}
.header{padding:16px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.header h1{font-size:18px;font-weight:700;background:linear-gradient(135deg,var(--primary),#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.header .subtitle{font-size:12px;color:var(--text-muted)}
.main{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:0;max-height:calc(100vh - 60px)}
.panel{display:flex;flex-direction:column;border-right:1px solid var(--border)}
.panel:last-child{border-right:none}
.panel-header{padding:12px 16px;border-bottom:1px solid var(--border);font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px}
.method-row{display:flex;gap:8px;padding:16px;border-bottom:1px solid var(--border)}
.method-select{background:var(--surface);border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:var(--radius);font-size:13px;font-weight:600;cursor:pointer}
.method-select option{background:var(--surface)}
.url-input{flex:1;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:var(--radius);font-size:13px;font-family:var(--mono);outline:none}
.url-input:focus{border-color:var(--primary)}
.send-btn{background:var(--primary);color:#fff;border:none;padding:8px 20px;border-radius:var(--radius);font-size:13px;font-weight:600;cursor:pointer;transition:opacity .2s}
.send-btn:hover{opacity:.9}
.send-btn:disabled{opacity:.5}
.body-area{flex:1;overflow:auto;padding:16px}
textarea{width:100%;height:200px;background:var(--bg);border:1px solid var(--border);color:var(--text);padding:12px;border-radius:var(--radius);font-family:var(--mono);font-size:12px;resize:vertical;outline:none}
textarea:focus{border-color:var(--primary)}
.headers-section{padding:16px}
.header-row{display:flex;gap:8px;margin-bottom:8px}
.header-row input{flex:1;background:var(--bg);border:1px solid var(--border);color:var(--text);padding:6px 10px;border-radius:var(--radius);font-size:12px;font-family:var(--mono);outline:none}
.add-header{background:none;border:1px dashed var(--border);color:var(--text-muted);padding:6px 12px;border-radius:var(--radius);cursor:pointer;font-size:12px;width:100%}
.response-area{flex:1;overflow:auto;padding:16px}
.status-bar{padding:8px 16px;display:flex;gap:16px;font-size:12px;font-family:var(--mono);border-bottom:1px solid var(--border)}
.status-badge{padding:2px 8px;border-radius:4px;font-weight:600}
.status-2xx{background:rgba(34,197,94,.15);color:var(--success)}
.status-4xx{background:rgba(239,68,68,.15);color:var(--error)}
.status-5xx{background:rgba(239,68,68,.15);color:var(--error)}
pre{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:12px;font-family:var(--mono);font-size:12px;line-height:1.6;overflow-x:auto;white-space:pre-wrap;word-break:break-word;color:var(--text)}
.empty-state{display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:14px;flex-direction:column;gap:8px}
.history{padding:16px;max-height:200px;overflow-y:auto}
.history-item{padding:8px 10px;margin-bottom:4px;border-radius:var(--radius);cursor:pointer;font-size:12px;display:flex;align-items:center;gap:8px;font-family:var(--mono)}
.history-item:hover{background:var(--surface)}
.history-item .method-tag{font-weight:700;font-size:10px;padding:2px 6px;border-radius:3px}
.GET{color:#22c55e}.POST{color:#3b82f6}.PUT{color:#f59e0b}.DELETE{color:#ef4444}.PATCH{color:#8b5cf6}
.tabs{display:flex;border-bottom:1px solid var(--border)}
.tab{padding:8px 16px;font-size:12px;cursor:pointer;color:var(--text-muted);border-bottom:2px solid transparent}
.tab.active{color:var(--primary);border-bottom-color:var(--primary)}
@media(max-width:768px){.main{grid-template-columns:1fr;max-height:none}.panel{border-right:none;border-bottom:1px solid var(--border)}}
</style>
</head>
<body>
<div class="header"><div><h1>REST API Playground</h1><div class="subtitle">Test APIs directly in your browser — no server needed</div></div></div>
<div class="main">
<div class="panel">
<div class="panel-header">Request</div>
<div class="method-row">
<select class="method-select" id="method"><option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option></select>
<input class="url-input" id="url" placeholder="https://jsonplaceholder.typicode.com/posts/1" value="https://jsonplaceholder.typicode.com/posts/1">
<button class="send-btn" id="sendBtn" onclick="sendRequest()">Send</button>
</div>
<div class="tabs"><div class="tab active" onclick="switchTab(this,'bodyTab')">Body</div><div class="tab" onclick="switchTab(this,'headersTab')">Headers</div><div class="tab" onclick="switchTab(this,'historyTab')">History</div></div>
<div id="bodyTab" class="body-area"><textarea id="reqBody" placeholder='{"key": "value"}'></textarea></div>
<div id="headersTab" class="headers-section" style="display:none"><div id="headerRows"><div class="header-row"><input placeholder="Content-Type" value="Content-Type"><input placeholder="application/json" value="application/json"></div></div><button class="add-header" onclick="addHeader()">+ Add Header</button></div>
<div id="historyTab" class="history" style="display:none"><div class="empty-state" style="height:auto;padding:20px">No requests yet</div></div>
</div>
<div class="panel">
<div class="panel-header">Response</div>
<div class="status-bar" id="statusBar" style="display:none"><span>Status: <span class="status-badge" id="statusCode"></span></span><span>Time: <span id="resTime"></span></span><span>Size: <span id="resSize"></span></span></div>
<div class="response-area" id="responseArea"><div class="empty-state"><svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM9 10h.01M15 10h.01M8 14s1.5 2 4 2 4-2 4-2"/></svg>Send a request to see the response</div></div>
</div>
</div>
<script>
const history=[];
function switchTab(el,id){el.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');['bodyTab','headersTab','historyTab'].forEach(t=>document.getElementById(t).style.display=t===id?'block':'none')}
function addHeader(){const row=document.createElement('div');row.className='header-row';row.innerHTML='<input placeholder="Key"><input placeholder="Value">';document.getElementById('headerRows').appendChild(row)}
function getHeaders(){const rows=document.querySelectorAll('#headerRows .header-row');const h={};rows.forEach(r=>{const inputs=r.querySelectorAll('input');if(inputs[0].value)h[inputs[0].value]=inputs[1].value});return h}
async function sendRequest(){const method=document.getElementById('method').value;const url=document.getElementById('url').value;const body=document.getElementById('reqBody').value;const btn=document.getElementById('sendBtn');btn.disabled=true;btn.textContent='...';const start=Date.now();try{const opts={method,headers:getHeaders()};if(['POST','PUT','PATCH'].includes(method)&&body)opts.body=body;const res=await fetch(url,opts);const time=Date.now()-start;const text=await res.text();let formatted=text;try{formatted=JSON.stringify(JSON.parse(text),null,2)}catch{}document.getElementById('statusBar').style.display='flex';const sc=document.getElementById('statusCode');sc.textContent=res.status+' '+res.statusText;sc.className='status-badge '+(res.status<300?'status-2xx':res.status<500?'status-4xx':'status-5xx');document.getElementById('resTime').textContent=time+'ms';document.getElementById('resSize').textContent=(new Blob([text]).size/1024).toFixed(1)+'KB';document.getElementById('responseArea').innerHTML='<pre>'+formatted.replace(/</g,'&lt;')+'</pre>';history.unshift({method,url,status:res.status,time});updateHistory()}catch(e){document.getElementById('responseArea').innerHTML='<pre style="color:var(--error)">Error: '+e.message+'</pre>'}btn.disabled=false;btn.textContent='Send'}
function updateHistory(){const el=document.getElementById('historyTab');el.innerHTML=history.map((h,i)=>'<div class="history-item" onclick="loadHistory('+i+')"><span class="method-tag '+h.method+'">'+h.method+'</span><span>'+h.url.substring(0,40)+'</span></div>').join('')}
function loadHistory(i){const h=history[i];document.getElementById('method').value=h.method;document.getElementById('url').value=h.url;document.querySelector('.tab').click()}
</script>
</body>
</html>`,
    },
    {
      path: "README.md",
      content: `# Interactive REST API Playground

A self-contained API testing tool in a single HTML file. Just open index.html in your browser!

## Features
- GET, POST, PUT, PATCH, DELETE support
- Custom headers management
- JSON response formatting
- Request history
- Response time & size metrics

## Usage
Simply open \`index.html\` in any modern browser. No server required!

## Author
Ankit Sharma
`,
    },
  ];
}

function getMicroservicesMonitorFiles(): ProjectFile[] {
  return [
    {
      path: "README.md",
      content: `# Microservices Health Monitor

Real-time monitoring dashboard for distributed microservices.

## Tech Stack
- React + TypeScript + TailwindCSS
- Node.js + Express + WebSocket
- Recharts for data visualization

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

## Features
- Real-time health indicators
- Latency and throughput charts
- Service dependency mapping
- Configurable alerting
- Error rate tracking

## Author
Ankit Sharma - Microservices Architecture Expert
`,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "microservices-health-monitor",
          version: "1.0.0",
          scripts: { dev: "concurrently \"npm run server\" \"npm run client\"", server: "tsx watch server/index.ts", client: "vite" },
          dependencies: { express: "^4.18.2", ws: "^8.16.0", react: "^18.2.0", "react-dom": "^18.2.0", recharts: "^2.10.0" },
          devDependencies: { typescript: "^5.3.0", vite: "^5.0.0", "@vitejs/plugin-react": "^4.2.0", tailwindcss: "^3.4.0", tsx: "^4.7.0", concurrently: "^8.2.0" },
        },
        null,
        2
      ),
    },
    {
      path: "server/index.ts",
      content: `import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

interface ServiceHealth {
  name: string;
  status: "healthy" | "degraded" | "down";
  latency: number;
  uptime: number;
  errorRate: number;
  requestsPerMin: number;
}

const services: ServiceHealth[] = [
  { name: "auth-service", status: "healthy", latency: 45, uptime: 99.9, errorRate: 0.1, requestsPerMin: 1200 },
  { name: "payment-service", status: "healthy", latency: 120, uptime: 99.5, errorRate: 0.5, requestsPerMin: 800 },
  { name: "user-service", status: "healthy", latency: 30, uptime: 99.99, errorRate: 0.01, requestsPerMin: 2000 },
  { name: "notification-service", status: "degraded", latency: 350, uptime: 97.2, errorRate: 2.8, requestsPerMin: 500 },
  { name: "analytics-service", status: "healthy", latency: 85, uptime: 99.7, errorRate: 0.3, requestsPerMin: 1500 },
];

function randomize(service: ServiceHealth): ServiceHealth {
  return {
    ...service,
    latency: Math.max(10, service.latency + (Math.random() - 0.5) * 40),
    errorRate: Math.max(0, service.errorRate + (Math.random() - 0.5) * 0.5),
    requestsPerMin: Math.max(100, service.requestsPerMin + Math.floor((Math.random() - 0.5) * 200)),
  };
}

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    const data = services.map(randomize);
    ws.send(JSON.stringify({ type: "health-update", services: data, timestamp: Date.now() }));
  }, 2000);
  ws.on("close", () => clearInterval(interval));
});

app.get("/api/services", (_req, res) => res.json(services));

server.listen(3000, () => console.log("Monitor running on port 3000"));
`,
    },
  ];
}

function getGenAIPipelineFiles(): ProjectFile[] {
  return [
    {
      path: "README.md",
      content: `# GenAI Content Automation Pipeline

Intelligent content generation pipeline with visual workflow builder and multi-agent orchestration.

## Tech Stack
- React + TypeScript + TailwindCSS
- Node.js + Express
- OpenAI API / LangChain
- Drag-and-drop workflow builder

## Getting Started
\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## AI Agents
- **Researcher** - Gathers information on topics
- **Writer** - Generates initial content drafts
- **Editor** - Polishes and refines content
- **Publisher** - Formats for different outputs

## Features
- Visual drag-and-drop workflow builder
- Multi-agent orchestration
- Prompt template management
- Content quality scoring
- Batch processing with progress tracking

## Author
Ankit Sharma - AI/GenAI Enthusiast | Copilot Hackathon Winner
`,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "genai-content-pipeline",
          version: "1.0.0",
          scripts: { dev: "concurrently \"npm run server\" \"npm run client\"", server: "tsx watch src/server/index.ts", client: "vite" },
          dependencies: { express: "^4.18.2", openai: "^4.20.0", langchain: "^0.1.0", react: "^18.2.0", "react-dom": "^18.2.0", "react-flow-renderer": "^11.10.0" },
          devDependencies: { typescript: "^5.3.0", vite: "^5.0.0", "@vitejs/plugin-react": "^4.2.0", tailwindcss: "^3.4.0", tsx: "^4.7.0", concurrently: "^8.2.0" },
        },
        null,
        2
      ),
    },
    {
      path: ".env.example",
      content: `OPENAI_API_KEY=your_openai_api_key_here\n`,
    },
    {
      path: "src/server/index.ts",
      content: `import express from "express";
import { pipelineRouter } from "./routes/pipeline";

const app = express();
app.use(express.json());
app.use("/api/pipeline", pipelineRouter);

app.listen(3000, () => console.log("GenAI Pipeline running on port 3000"));
`,
    },
    {
      path: "src/server/routes/pipeline.ts",
      content: `import { Router } from "express";
import { researchAgent, writerAgent, editorAgent } from "../agents";

export const pipelineRouter = Router();

pipelineRouter.post("/execute", async (req, res) => {
  const { topic, steps } = req.body;
  const results: any[] = [];

  for (const step of steps) {
    switch (step.type) {
      case "research":
        results.push(await researchAgent.execute(topic));
        break;
      case "write":
        results.push(await writerAgent.execute(topic, results));
        break;
      case "edit":
        results.push(await editorAgent.execute(results[results.length - 1]));
        break;
    }
  }

  res.json({ results, completedAt: new Date().toISOString() });
});

pipelineRouter.get("/templates", (_req, res) => {
  res.json({
    templates: [
      { id: 1, name: "Blog Post Pipeline", steps: ["research", "write", "edit"] },
      { id: 2, name: "Technical Doc", steps: ["research", "write"] },
      { id: 3, name: "Social Media Pack", steps: ["research", "write", "edit"] },
    ],
  });
});
`,
    },
    {
      path: "src/server/agents/index.ts",
      content: `import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callAI(systemPrompt: string, userPrompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return response.choices[0].message.content;
}

export const researchAgent = {
  async execute(topic: string) {
    return callAI(
      "You are a research agent. Gather key facts, statistics, and insights about the given topic.",
      \`Research the following topic thoroughly: \${topic}\`
    );
  },
};

export const writerAgent = {
  async execute(topic: string, context: any[]) {
    return callAI(
      "You are a content writer. Create engaging, well-structured content based on the research provided.",
      \`Write about: \${topic}\\n\\nResearch context: \${JSON.stringify(context)}\`
    );
  },
};

export const editorAgent = {
  async execute(draft: string) {
    return callAI(
      "You are an editor. Polish the content for clarity, grammar, and engagement. Maintain the original voice.",
      \`Edit and improve this content:\\n\\n\${draft}\`
    );
  },
};
`,
    },
  ];
}

function getAnalyticsDashboardFiles(): ProjectFile[] {
  return [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Real-time Analytics Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0c0f1a;--card:#141829;--border:#1e2640;--text:#e8eaed;--muted:#6b7394;--primary:#6366f1;--success:#10b981;--warning:#f59e0b;--error:#ef4444;--blue:#3b82f6;--purple:#8b5cf6}
body{background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,sans-serif;padding:20px}
.dashboard{max-width:1200px;margin:0 auto}
.header{margin-bottom:24px;display:flex;justify-content:space-between;align-items:center}
.header h1{font-size:22px;font-weight:700}
.header .live{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--success)}
.header .live::before{content:'';width:8px;height:8px;background:var(--success);border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.kpi-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.kpi-card .label{font-size:12px;color:var(--muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px}
.kpi-card .value{font-size:28px;font-weight:700}
.kpi-card .change{font-size:12px;margin-top:4px;display:flex;align-items:center;gap:4px}
.kpi-card .change.up{color:var(--success)}
.kpi-card .change.down{color:var(--error)}
.charts-grid{display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:24px}
.chart-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.chart-card h3{font-size:14px;font-weight:600;margin-bottom:16px;color:var(--muted)}
.chart-container{position:relative;height:250px}
.bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.table-container{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:10px 12px;color:var(--muted);font-weight:500;border-bottom:1px solid var(--border);font-size:11px;text-transform:uppercase;letter-spacing:.5px}
td{padding:10px 12px;border-bottom:1px solid var(--border)}
.status{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}
.status.active{background:var(--success)}.status.pending{background:var(--warning)}.status.error{background:var(--error)}
@media(max-width:768px){.kpi-grid{grid-template-columns:repeat(2,1fr)}.charts-grid,.bottom-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="dashboard">
<div class="header"><h1>Analytics Dashboard</h1><div class="live">Live Updates</div></div>
<div class="kpi-grid">
<div class="kpi-card"><div class="label">Total Revenue</div><div class="value" id="kpi1">$124,592</div><div class="change up">+12.5% vs last month</div></div>
<div class="kpi-card"><div class="label">Active Users</div><div class="value" id="kpi2">8,429</div><div class="change up">+5.2% vs last month</div></div>
<div class="kpi-card"><div class="label">Conversion Rate</div><div class="value" id="kpi3">3.24%</div><div class="change down">-0.8% vs last month</div></div>
<div class="kpi-card"><div class="label">Avg Session</div><div class="value" id="kpi4">4m 32s</div><div class="change up">+15s vs last month</div></div>
</div>
<div class="charts-grid">
<div class="chart-card"><h3>Revenue Over Time</h3><div class="chart-container"><canvas id="lineChart"></canvas></div></div>
<div class="chart-card"><h3>Traffic Sources</h3><div class="chart-container"><canvas id="doughnutChart"></canvas></div></div>
</div>
<div class="bottom-grid">
<div class="chart-card"><h3>Weekly Performance</h3><div class="chart-container"><canvas id="barChart"></canvas></div></div>
<div class="chart-card"><h3>Recent Transactions</h3><div class="table-container"><table><thead><tr><th>User</th><th>Amount</th><th>Status</th></tr></thead><tbody id="tableBody"></tbody></table></div></div>
</div>
</div>
<script>
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const lineData={labels:months,datasets:[{label:'Revenue',data:[12000,19000,15000,22000,18000,24000,28000,25000,30000,32000,28000,35000],borderColor:'#6366f1',backgroundColor:'rgba(99,102,241,.1)',fill:true,tension:.4,pointRadius:3}]};
const lineChart=new Chart(document.getElementById('lineChart'),{type:'line',data:lineData,options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'#1e2640'},ticks:{color:'#6b7394',font:{size:10}}},y:{grid:{color:'#1e2640'},ticks:{color:'#6b7394',font:{size:10},callback:v=>'$'+v/1000+'k'}}}}});
const doughnutChart=new Chart(document.getElementById('doughnutChart'),{type:'doughnut',data:{labels:['Direct','Organic','Social','Referral','Email'],datasets:[{data:[35,28,18,12,7],backgroundColor:['#6366f1','#10b981','#f59e0b','#3b82f6','#8b5cf6'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:'#6b7394',font:{size:11},padding:12}}},cutout:'65%'}});
const barChart=new Chart(document.getElementById('barChart'),{type:'bar',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Sessions',data:[1200,1900,1500,2200,1800,900,700],backgroundColor:'#6366f1',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:'#6b7394',font:{size:10}}},y:{grid:{color:'#1e2640'},ticks:{color:'#6b7394',font:{size:10}}}}}});
const users=['Alice Chen','Bob Smith','Carlos M.','Diana K.','Evan P.','Fiona L.','George R.','Hannah W.'];
const statuses=['active','active','pending','active','error','active','pending','active'];
function updateTable(){const tbody=document.getElementById('tableBody');tbody.innerHTML='';for(let i=0;i<5;i++){const user=users[Math.floor(Math.random()*users.length)];const amount=(Math.random()*500+10).toFixed(2);const status=statuses[Math.floor(Math.random()*statuses.length)];tbody.innerHTML+=\`<tr><td>\${user}</td><td>$\${amount}</td><td><span class="status \${status}"></span>\${status}</td></tr>\`}}
updateTable();
setInterval(()=>{lineChart.data.datasets[0].data=lineChart.data.datasets[0].data.map(v=>v+Math.floor((Math.random()-.3)*2000));lineChart.update('none');document.getElementById('kpi1').textContent='$'+(124592+Math.floor(Math.random()*5000)).toLocaleString();document.getElementById('kpi2').textContent=(8429+Math.floor(Math.random()*200)).toLocaleString();updateTable()},3000);
</script>
</body>
</html>`,
    },
    {
      path: "README.md",
      content: `# Real-time Analytics Dashboard

Beautiful analytics dashboard in a single HTML file with live-updating charts and KPIs.

## Features
- Animated KPI cards with trends
- Line, bar, and doughnut charts (Chart.js)
- Simulated real-time data updates
- Responsive layout
- Transaction table with status indicators

## Usage
Open \`index.html\` in your browser. No installation needed!

## Author
Ankit Sharma
`,
    },
  ];
}

function getCopilotBotFiles(): ProjectFile[] {
  return [
    {
      path: "README.md",
      content: `# GitHub Copilot Workflow Bot

AI-powered GitHub bot for automated PR reviews, documentation generation, and test case suggestions.

Inspired by the winning project at the Danske Bank GitHub Copilot Hackathon.

## Tech Stack
- Node.js + TypeScript + Express
- GitHub REST & Webhooks API
- OpenAI API for code analysis

## Setup
\`\`\`bash
npm install
cp .env.example .env  # Configure GitHub & OpenAI tokens
npm run dev
\`\`\`

## Features
- Automated PR code review with AI suggestions
- Documentation generation from code
- Test case generation
- Code style enforcement
- Webhook-based event handling

## Author
Ankit Sharma - 2nd Place, GitHub Copilot Hackathon @ Danske Bank
`,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "copilot-workflow-bot",
          version: "1.0.0",
          scripts: { dev: "tsx watch src/index.ts", build: "tsc", test: "jest" },
          dependencies: { express: "^4.18.2", "@octokit/rest": "^20.0.0", "@octokit/webhooks": "^12.0.0", openai: "^4.20.0" },
          devDependencies: { typescript: "^5.3.0", tsx: "^4.7.0", "@types/express": "^4.17.21" },
        },
        null,
        2
      ),
    },
    {
      path: ".env.example",
      content: `GITHUB_TOKEN=your_github_token
GITHUB_WEBHOOK_SECRET=your_webhook_secret
OPENAI_API_KEY=your_openai_key
PORT=3000
`,
    },
    {
      path: "src/index.ts",
      content: `import express from "express";
import { webhookHandler } from "./webhooks/handler";
import { reviewService } from "./services/review";

const app = express();
app.use(express.json());

app.post("/webhooks/github", webhookHandler);

app.post("/api/review", async (req, res) => {
  const { code, language } = req.body;
  const review = await reviewService.analyzeCode(code, language);
  res.json(review);
});

app.post("/api/generate-tests", async (req, res) => {
  const { code, language } = req.body;
  const tests = await reviewService.generateTests(code, language);
  res.json({ tests });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Copilot Bot running on port \${PORT}\`));
`,
    },
    {
      path: "src/webhooks/handler.ts",
      content: `import { Request, Response } from "express";
import { reviewService } from "../services/review";

export async function webhookHandler(req: Request, res: Response) {
  const event = req.headers["x-github-event"];
  const payload = req.body;

  switch (event) {
    case "pull_request":
      if (payload.action === "opened" || payload.action === "synchronize") {
        await reviewService.reviewPR(payload.pull_request);
      }
      break;
    case "push":
      console.log(\`Push to \${payload.ref}\`);
      break;
    default:
      console.log(\`Unhandled event: \${event}\`);
  }

  res.status(200).json({ received: true });
}
`,
    },
    {
      path: "src/services/review.ts",
      content: `import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const reviewService = {
  async analyzeCode(code: string, language: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: \`Review this \${language} code. Provide: bugs, improvements, security issues, and a quality score (0-100). Return JSON.\` },
        { role: "user", content: code },
      ],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || "{}");
  },

  async generateTests(code: string, language: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: \`Generate comprehensive unit tests for this \${language} code using appropriate testing frameworks.\` },
        { role: "user", content: code },
      ],
    });
    return response.choices[0].message.content;
  },

  async reviewPR(pullRequest: any) {
    console.log(\`Reviewing PR #\${pullRequest.number}: \${pullRequest.title}\`);
    // In production: fetch diff, analyze with AI, post review comments
  },
};
`,
    },
  ];
}

function getErrorMonitorFiles(): ProjectFile[] {
  return [
    {
      path: "README.md",
      content: `# Smart Error Monitoring System

Production-grade error monitoring and alerting system with intelligent error grouping and trend detection.

## Tech Stack
- React + TypeScript + TailwindCSS
- Node.js + Express
- PostgreSQL for error storage
- WebSocket for real-time alerts

## Getting Started
\`\`\`bash
npm install
docker-compose up -d  # Start PostgreSQL
npm run db:migrate
npm run dev
\`\`\`

## Features
- Intelligent error grouping and deduplication
- Stack trace visualization
- Error frequency trends
- User impact analysis
- Notification workflows
- JavaScript SDK for easy integration

## SDK Usage
\`\`\`javascript
import { ErrorMonitor } from './sdk';
ErrorMonitor.init({ projectId: 'your-project', endpoint: 'http://localhost:3000' });
\`\`\`

## Author
Ankit Sharma - Reduced exceptions by 25% through structured error handling
`,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "smart-error-monitor",
          version: "1.0.0",
          scripts: { dev: "concurrently \"npm run server\" \"npm run client\"", server: "tsx watch server/index.ts", client: "vite", "db:migrate": "tsx server/migrate.ts" },
          dependencies: { express: "^4.18.2", pg: "^8.11.0", ws: "^8.16.0", react: "^18.2.0", "react-dom": "^18.2.0", recharts: "^2.10.0", "source-map": "^0.7.4" },
          devDependencies: { typescript: "^5.3.0", vite: "^5.0.0", "@vitejs/plugin-react": "^4.2.0", tailwindcss: "^3.4.0", tsx: "^4.7.0", concurrently: "^8.2.0" },
        },
        null,
        2
      ),
    },
    {
      path: "server/index.ts",
      content: `import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

app.use(express.json());

const errors: any[] = [];

app.post("/api/errors", (req, res) => {
  const error = {
    id: Date.now().toString(),
    ...req.body,
    receivedAt: new Date().toISOString(),
    count: 1,
  };

  const existing = errors.find(e => e.message === error.message && e.stack === error.stack);
  if (existing) {
    existing.count++;
    existing.lastSeen = error.receivedAt;
  } else {
    errors.push(error);
  }

  wss.clients.forEach(client => {
    client.send(JSON.stringify({ type: "new-error", error }));
  });

  res.status(201).json({ id: error.id });
});

app.get("/api/errors", (_req, res) => {
  res.json(errors.sort((a, b) => b.count - a.count));
});

app.get("/api/errors/stats", (_req, res) => {
  res.json({
    total: errors.length,
    totalOccurrences: errors.reduce((sum, e) => sum + e.count, 0),
    criticalCount: errors.filter(e => e.severity === "critical").length,
  });
});

server.listen(3000, () => console.log("Error Monitor running on port 3000"));
`,
    },
    {
      path: "sdk/index.ts",
      content: `interface ErrorMonitorConfig {
  projectId: string;
  endpoint: string;
}

let config: ErrorMonitorConfig;

export const ErrorMonitor = {
  init(cfg: ErrorMonitorConfig) {
    config = cfg;

    window.onerror = (message, source, lineno, colno, error) => {
      this.capture({
        message: String(message),
        stack: error?.stack || "",
        source: source || "",
        line: lineno || 0,
        column: colno || 0,
        severity: "error",
      });
    };

    window.onunhandledrejection = (event) => {
      this.capture({
        message: String(event.reason),
        stack: event.reason?.stack || "",
        severity: "error",
        type: "unhandled-rejection",
      });
    };
  },

  capture(errorData: Record<string, any>) {
    fetch(\`\${config.endpoint}/api/errors\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...errorData, projectId: config.projectId, timestamp: new Date().toISOString() }),
    }).catch(console.error);
  },
};
`,
    },
  ];
}

function getAIChatFiles(): ProjectFile[] {
  return [
    {
      path: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Chat Interface</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0f;--surface:rgba(255,255,255,.04);--glass:rgba(255,255,255,.06);--border:rgba(255,255,255,.08);--text:#f0f0f5;--muted:#8888a0;--primary:#7c3aed;--primary-glow:rgba(124,58,237,.15);--user-bg:linear-gradient(135deg,#7c3aed,#6d28d9);--ai-bg:rgba(255,255,255,.04);--radius:16px;--font:system-ui,-apple-system,sans-serif;--mono:'Fira Code',monospace}
body{background:var(--bg);color:var(--text);font-family:var(--font);height:100vh;display:flex;overflow:hidden}
.sidebar{width:260px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;backdrop-filter:blur(20px)}
.sidebar-header{padding:16px;border-bottom:1px solid var(--border)}
.sidebar-header h2{font-size:16px;font-weight:700;background:linear-gradient(135deg,#7c3aed,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.new-chat{width:100%;padding:10px;background:var(--glass);border:1px solid var(--border);color:var(--text);border-radius:10px;cursor:pointer;font-size:13px;margin-top:12px;transition:background .2s}
.new-chat:hover{background:rgba(255,255,255,.08)}
.chat-list{flex:1;overflow-y:auto;padding:8px}
.chat-item{padding:10px 12px;margin-bottom:4px;border-radius:10px;cursor:pointer;font-size:13px;color:var(--muted);transition:all .2s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chat-item:hover,.chat-item.active{background:var(--glass);color:var(--text)}
.main{flex:1;display:flex;flex-direction:column}
.messages{flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px}
.message{display:flex;gap:12px;max-width:720px;width:100%;margin:0 auto;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.message.user{flex-direction:row-reverse}
.avatar{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.message.user .avatar{background:var(--user-bg);color:white}
.message.ai .avatar{background:var(--glass);border:1px solid var(--border)}
.bubble{padding:14px 18px;border-radius:var(--radius);font-size:14px;line-height:1.7;max-width:85%}
.message.user .bubble{background:var(--user-bg);color:white;border-bottom-right-radius:4px}
.message.ai .bubble{background:var(--ai-bg);border:1px solid var(--border);border-bottom-left-radius:4px}
.bubble code{background:rgba(255,255,255,.1);padding:2px 6px;border-radius:4px;font-family:var(--mono);font-size:12px}
.bubble pre{background:rgba(0,0,0,.4);border:1px solid var(--border);border-radius:10px;padding:14px;margin:10px 0;overflow-x:auto;font-family:var(--mono);font-size:12px;line-height:1.5}
.typing{display:flex;gap:4px;padding:14px 18px}.typing span{width:6px;height:6px;background:var(--muted);border-radius:50%;animation:bounce 1.4s infinite ease-in-out both}
.typing span:nth-child(1){animation-delay:-.32s}.typing span:nth-child(2){animation-delay:-.16s}
@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
.input-area{padding:16px 24px;border-top:1px solid var(--border);background:var(--surface);backdrop-filter:blur(20px)}
.input-row{max-width:720px;margin:0 auto;display:flex;gap:10px;align-items:flex-end}
.input-wrapper{flex:1;position:relative}
.input-wrapper textarea{width:100%;background:var(--glass);border:1px solid var(--border);color:var(--text);padding:12px 16px;border-radius:14px;font-size:14px;font-family:var(--font);resize:none;outline:none;max-height:120px;line-height:1.5;transition:border-color .2s}
.input-wrapper textarea:focus{border-color:var(--primary)}
.send-btn{width:42px;height:42px;background:var(--primary);border:none;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .2s;flex-shrink:0}
.send-btn:hover{opacity:.85}
.send-btn svg{width:18px;height:18px;color:white}
.welcome{flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;color:var(--muted)}
.welcome h2{font-size:24px;font-weight:700;color:var(--text);background:linear-gradient(135deg,#7c3aed,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.welcome p{font-size:14px;max-width:400px;text-align:center;line-height:1.6}
.suggestions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
.suggestion{padding:12px;background:var(--glass);border:1px solid var(--border);border-radius:12px;font-size:13px;cursor:pointer;transition:background .2s;text-align:left}
.suggestion:hover{background:rgba(255,255,255,.08)}
.msg-actions{display:flex;gap:4px;margin-top:8px;opacity:0;transition:opacity .2s}
.message:hover .msg-actions{opacity:1}
.msg-action{background:var(--glass);border:1px solid var(--border);color:var(--muted);padding:4px 8px;border-radius:6px;font-size:10px;cursor:pointer}
.msg-action:hover{color:var(--text);background:rgba(255,255,255,.1)}
@media(max-width:768px){.sidebar{display:none}.messages{padding:16px}.input-area{padding:12px}}
</style>
</head>
<body>
<div class="sidebar">
<div class="sidebar-header">
<h2>AI Assistant</h2>
<button class="new-chat" onclick="newChat()">+ New Chat</button>
</div>
<div class="chat-list" id="chatList"></div>
</div>
<div class="main">
<div class="messages" id="messages">
<div class="welcome">
<h2>AI Chat Interface</h2>
<p>A production-quality chat UI. Start a conversation or try one of these suggestions:</p>
<div class="suggestions">
<div class="suggestion" onclick="sendSuggestion('Explain microservices architecture')">Explain microservices architecture</div>
<div class="suggestion" onclick="sendSuggestion('Write a REST API in Node.js')">Write a REST API in Node.js</div>
<div class="suggestion" onclick="sendSuggestion('What is CI/CD?')">What is CI/CD?</div>
<div class="suggestion" onclick="sendSuggestion('Review my Java code')">Review my Java code</div>
</div>
</div>
</div>
<div class="input-area">
<div class="input-row">
<div class="input-wrapper">
<textarea id="input" rows="1" placeholder="Type a message..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();send()}"></textarea>
</div>
<button class="send-btn" onclick="send()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>
</div>
</div>
</div>
<script>
let chats=[{id:1,title:'New Chat',messages:[]}];let currentChat=0;
var BT='${'`'}';
var responses={"default":"I am a demo AI chat interface. In production, this would connect to OpenAI, Anthropic, or any LLM API to provide intelligent responses. This interface demonstrates:\\n\\n- Streaming text animations\\n- Markdown rendering with code highlighting\\n- Glass-morphism design\\n- Conversation management\\n\\nBuilt by **Ankit Sharma** as a portfolio showcase project."};
function renderChats(){document.getElementById('chatList').innerHTML=chats.map(function(c,i){return '<div class="chat-item'+(i===currentChat?' active':'')+'" onclick="switchChat('+i+')">'+c.title+'</div>'}).join('')}
function switchChat(i){currentChat=i;renderChats();renderMessages()}
function newChat(){chats.push({id:Date.now(),title:'New Chat',messages:[]});currentChat=chats.length-1;renderChats();renderMessages()}
function renderMessages(){var el=document.getElementById('messages');if(!chats[currentChat].messages.length){el.innerHTML='<div class="welcome"><h2>AI Chat Interface</h2><p>A production-quality chat UI. Try a suggestion below:</p><div class="suggestions"><div class="suggestion" onclick="sendSuggestion(String.fromCharCode(39)+'Explain microservices'+String.fromCharCode(39))">Explain microservices</div><div class="suggestion" onclick="sendSuggestion(String.fromCharCode(39)+'Write a REST API'+String.fromCharCode(39))">Write a REST API</div><div class="suggestion" onclick="sendSuggestion(String.fromCharCode(39)+'What is CI/CD?'+String.fromCharCode(39))">What is CI/CD?</div><div class="suggestion" onclick="sendSuggestion(String.fromCharCode(39)+'Review my code'+String.fromCharCode(39))">Review my code</div></div></div>';return}
el.innerHTML=chats[currentChat].messages.map(function(m){return '<div class="message '+m.role+'"><div class="avatar">'+(m.role==='user'?'A':'AI')+'</div><div><div class="bubble">'+formatMessage(m.content)+'</div><div class="msg-actions"><button class="msg-action" onclick="copyMsg(this)">Copy</button></div></div></div>'}).join('');el.scrollTop=el.scrollHeight}
function formatMessage(text){return text.replace(/\\*\\*([^*]+)\\*\\*/g,'<strong>$1</strong>').replace(/\\n/g,'<br>')}
function copyMsg(btn){var text=btn.closest('.message').querySelector('.bubble').textContent;navigator.clipboard.writeText(text);btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy'},1500)}
function sendSuggestion(text){document.getElementById('input').value=text;send()}
function send(){var input=document.getElementById('input');var text=input.value.trim();if(!text)return;input.value='';
chats[currentChat].messages.push({role:'user',content:text});if(chats[currentChat].messages.length===1)chats[currentChat].title=text.substring(0,30);renderChats();renderMessages();
var el=document.getElementById('messages');el.innerHTML+='<div class="message ai"><div class="avatar">AI</div><div class="bubble"><div class="typing"><span></span><span></span><span></span></div></div></div>';el.scrollTop=el.scrollHeight;
setTimeout(function(){chats[currentChat].messages.push({role:'ai',content:responses["default"]});renderMessages()},1000+Math.random()*1500)}
renderChats();
var ta=document.getElementById('input');ta.addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'});
</script>
</body>
</html>`,
    },
    {
      path: "README.md",
      content: `# AI Chat Interface

Beautiful, production-quality AI chat interface in a single HTML file.

## Features
- Streaming text animation
- Markdown rendering with code highlighting
- Conversation management
- Glass-morphism UI design
- Responsive mobile-first layout
- Message copy functionality

## Usage
Open \`index.html\` in your browser. No installation needed!

## Connecting to an API
Replace the demo response logic with your preferred LLM API (OpenAI, Anthropic, etc.)

## Author
Ankit Sharma
`,
    },
  ];
}

function getCICDVisualizerFiles(): ProjectFile[] {
  return [
    {
      path: "README.md",
      content: `# CI/CD Pipeline Visualizer

Visual pipeline builder and executor dashboard for CI/CD workflows.

## Tech Stack
- React + TypeScript
- Framer Motion for animations
- TailwindCSS for styling
- Zustand for state management

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

## Features
- Drag-and-drop pipeline builder
- Real-time execution progress
- Job configuration
- Execution log streaming
- Deployment history timeline
- YAML export/import

## Author
Ankit Sharma - CI/CD & DevOps Enthusiast
`,
    },
    {
      path: "package.json",
      content: JSON.stringify(
        {
          name: "cicd-pipeline-visualizer",
          version: "1.0.0",
          scripts: { dev: "vite", build: "tsc && vite build" },
          dependencies: { react: "^18.2.0", "react-dom": "^18.2.0", "framer-motion": "^10.16.0", zustand: "^4.4.0" },
          devDependencies: { typescript: "^5.3.0", vite: "^5.0.0", "@vitejs/plugin-react": "^4.2.0", tailwindcss: "^3.4.0" },
        },
        null,
        2
      ),
    },
    {
      path: "src/store/pipeline-store.ts",
      content: `import { create } from "zustand";

interface Stage {
  id: string;
  name: string;
  jobs: Job[];
  status: "pending" | "running" | "success" | "failed";
}

interface Job {
  id: string;
  name: string;
  command: string;
  status: "pending" | "running" | "success" | "failed";
  duration?: number;
  logs: string[];
}

interface PipelineState {
  stages: Stage[];
  isRunning: boolean;
  addStage: (name: string) => void;
  addJob: (stageId: string, job: Omit<Job, "id" | "status" | "logs">) => void;
  runPipeline: () => Promise<void>;
  reset: () => void;
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  stages: [
    {
      id: "1",
      name: "Build",
      status: "pending",
      jobs: [
        { id: "j1", name: "Install Dependencies", command: "npm install", status: "pending", logs: [] },
        { id: "j2", name: "Compile TypeScript", command: "tsc --build", status: "pending", logs: [] },
      ],
    },
    {
      id: "2",
      name: "Test",
      status: "pending",
      jobs: [
        { id: "j3", name: "Unit Tests", command: "jest --coverage", status: "pending", logs: [] },
        { id: "j4", name: "Integration Tests", command: "jest --config jest.integration.config.ts", status: "pending", logs: [] },
      ],
    },
    {
      id: "3",
      name: "Deploy",
      status: "pending",
      jobs: [
        { id: "j5", name: "Build Docker Image", command: "docker build -t app:latest .", status: "pending", logs: [] },
        { id: "j6", name: "Push to Registry", command: "docker push app:latest", status: "pending", logs: [] },
        { id: "j7", name: "Deploy to K8s", command: "kubectl apply -f k8s/", status: "pending", logs: [] },
      ],
    },
  ],
  isRunning: false,
  addStage: (name) =>
    set((state) => ({
      stages: [...state.stages, { id: Date.now().toString(), name, status: "pending", jobs: [] }],
    })),
  addJob: (stageId, job) =>
    set((state) => ({
      stages: state.stages.map((s) =>
        s.id === stageId
          ? { ...s, jobs: [...s.jobs, { ...job, id: Date.now().toString(), status: "pending", logs: [] }] }
          : s
      ),
    })),
  runPipeline: async () => {
    set({ isRunning: true });
    const { stages } = get();
    for (const stage of stages) {
      set((state) => ({
        stages: state.stages.map((s) => (s.id === stage.id ? { ...s, status: "running" } : s)),
      }));
      for (const job of stage.jobs) {
        set((state) => ({
          stages: state.stages.map((s) =>
            s.id === stage.id
              ? { ...s, jobs: s.jobs.map((j) => (j.id === job.id ? { ...j, status: "running" } : j)) }
              : s
          ),
        }));
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 2000));
        const success = Math.random() > 0.1;
        set((state) => ({
          stages: state.stages.map((s) =>
            s.id === stage.id
              ? {
                  ...s,
                  jobs: s.jobs.map((j) =>
                    j.id === job.id
                      ? { ...j, status: success ? "success" : "failed", duration: Math.floor(Math.random() * 30) + 5 }
                      : j
                  ),
                }
              : s
          ),
        }));
      }
      set((state) => ({
        stages: state.stages.map((s) =>
          s.id === stage.id
            ? { ...s, status: s.jobs.every((j) => j.status === "success") ? "success" : "failed" }
            : s
        ),
      }));
    }
    set({ isRunning: false });
  },
  reset: () =>
    set((state) => ({
      stages: state.stages.map((s) => ({
        ...s,
        status: "pending",
        jobs: s.jobs.map((j) => ({ ...j, status: "pending", duration: undefined, logs: [] })),
      })),
      isRunning: false,
    })),
}));
`,
    },
    {
      path: "src/App.tsx",
      content: `import { usePipelineStore } from "./store/pipeline-store";

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-gray-400",
    running: "bg-blue-500 animate-pulse",
    success: "bg-green-500",
    failed: "bg-red-500",
  };
  return <span className={\`inline-block w-2.5 h-2.5 rounded-full \${colors[status]}\`} />;
}

export default function App() {
  const { stages, isRunning, runPipeline, reset } = usePipelineStore();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">CI/CD Pipeline Visualizer</h1>
        <p className="text-gray-400 mb-8">Visual pipeline builder with real-time execution</p>

        <div className="flex gap-3 mb-8">
          <button onClick={runPipeline} disabled={isRunning}
            className="px-4 py-2 bg-blue-600 rounded-lg font-medium disabled:opacity-50">
            {isRunning ? "Running..." : "Run Pipeline"}
          </button>
          <button onClick={reset} className="px-4 py-2 bg-gray-800 rounded-lg font-medium">Reset</button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex items-start gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 min-w-[280px]">
                <div className="flex items-center gap-2 mb-4">
                  <StatusDot status={stage.status} />
                  <h3 className="font-semibold">{stage.name}</h3>
                </div>
                <div className="space-y-2">
                  {stage.jobs.map((job) => (
                    <div key={job.id} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusDot status={job.status} />
                        <span className="text-sm font-medium">{job.name}</span>
                      </div>
                      <code className="text-xs text-gray-500">{job.command}</code>
                      {job.duration && <span className="text-xs text-gray-500 ml-2">{job.duration}s</span>}
                    </div>
                  ))}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="flex items-center self-center text-gray-600 text-2xl">&#x2192;</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
    },
  ];
}
