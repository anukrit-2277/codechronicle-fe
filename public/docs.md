# CodeChronicle ⚡

**AI-Powered VS Code Extension for Codebase Understanding, Interactive Dependency Graphs, Blast Radius Prediction, and Natural Language Exploration**

---

## Overview

CodeChronicle is a VS Code extension designed to help developers understand and safely modify large, complex codebases. It combines **deterministic local static analysis** with **cloud-powered AI reasoning** (Amazon Bedrock) to provide deep codebase insights without leaving your editor.

The core philosophy is **local-first**: all structural analysis (scanning, parsing, graph building, metrics, blast radius) runs entirely on your machine. Cloud AI features (file summaries, semantic risk scoring, natural language Q&A) are optional and powered by AWS services when enabled.

---

## Key Features

| Feature | Description | Requires Cloud |
|---------|-------------|:--------------:|
| **Multi-Language Dependency Graph** | Interactive Cytoscape.js graph supporting 15+ languages | No |
| **Blast Radius Prediction** | BFS-based transitive impact analysis before you change a line | No |
| **AI File Summaries** | 2-3 sentence explanations of what each file does and why | Yes |
| **Semantic Risk Scoring** | AI-assessed risk based on side effects, security, coupling | Yes |
| **Structural Risk Scoring** | Deterministic risk from dependency count, centrality, LOC | No |
| **Natural Language Q&A** | Ask questions about your codebase in plain English | Yes |
| **Risk Health Dashboard** | Codebase-wide risk distribution, health score, export reports | No |
| **Graph Search & Filter** | Real-time node search by name and path with highlighting | No |
| **Incremental Updates** | File watcher auto-updates the graph on file changes | No |
| **Smart Caching** | DynamoDB cloud cache (7-day TTL) + local JSON cache | Hybrid |
| **Premium Dark UI** | Glassmorphism design with neon accents and smooth animations | No |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                    VS Code Extension (Local)                         │
│                                                                      │
│  ┌─────────────┐   ┌──────────────┐   ┌─────────────┐              │
│  │  Workspace   │──▶│  Dependency   │──▶│   Graph     │              │
│  │  Scanner     │   │  Parser      │   │   Builder   │              │
│  └─────────────┘   └──────────────┘   └──────┬──────┘              │
│                                               │                      │
│  ┌─────────────┐   ┌──────────────┐   ┌──────▼──────┐              │
│  │   File       │   │    Cache     │   │   Metrics   │              │
│  │   Watcher    │   │   Manager    │   │   Engine    │              │
│  └─────────────┘   └──────────────┘   └──────┬──────┘              │
│                                               │                      │
│  ┌────────────────────────────────────────────▼──────────────────┐  │
│  │           React Webview (Cytoscape.js + Tailwind CSS)         │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                          │                                           │
│                   API Client (HTTPS)                                 │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
               ┌───────────▼────────────┐
               │   AWS Cloud Backend    │
               │  ┌──────────────────┐  │
               │  │   API Gateway    │  │
               │  └────────┬─────────┘  │
               │  ┌────────▼─────────┐  │
               │  │  AWS Lambda      │  │
               │  └──┬──────────┬────┘  │
               │  ┌──▼───┐  ┌──▼────┐  │
               │  │Bedrock│  │Dynamo │  │
               │  │(Nova) │  │  DB   │  │
               │  └───────┘  └───────┘  │
               └────────────────────────┘
```

### Four-Layer Design

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Analysis Layer** | Local | File scanning, dependency parsing, graph construction, metrics computation |
| **Visualization Layer** | Local | React.js webview with Cytoscape.js graph rendering, Tailwind CSS styling |
| **Cloud Backend Layer** | AWS | Lambda functions behind API Gateway for AI orchestration |
| **AI Layer** | AWS Bedrock | Foundation model inference for summaries, risk analysis, and Q&A |

---

## AWS Services Used

### Amazon Bedrock (AI/ML)

Amazon Bedrock provides the foundation model inference that powers all AI features. CodeChronicle uses the **Amazon Nova** family of models via the Bedrock **Converse API**.

| Model | Usage |
|-------|-------|
| `us.amazon.nova-premier-v1:0` | Primary model for file summaries, risk scoring, and Q&A |
| `us.amazon.nova-lite-v1:0` | Fallback model when Premier is unavailable |

**How it works:**
- Lambda functions construct structured prompts with file content, metrics, and dependency context
- Prompts are sent to Bedrock via `@aws-sdk/client-bedrock-runtime` using the `ConverseCommand`
- Responses are parsed (summaries as plain text, risk scores and queries as JSON)
- Results are cached in DynamoDB to minimize redundant model invocations

### AWS Lambda (Serverless Compute)

Five Lambda functions handle all backend logic, deployed via the Serverless Framework:

| Function | Handler | Timeout | Purpose |
|----------|---------|---------|---------|
| `aiExplain` | `lambda/aiHandler.explain` | 60s | Generates AI file summaries |
| `aiRiskScore` | `lambda/riskEngine.assessRisk` | 60s | Produces semantic risk assessments |
| `aiQuery` | `lambda/aiHandler.query` | 60s | Answers natural language codebase questions |
| `cacheGet` | `lambda/cacheService.get` | 30s | Reads cached summaries and risk scores |
| `cachePut` | `lambda/cacheService.put` | 30s | Writes cache entries |

**Runtime:** Node.js 20.x | **Memory:** 512 MB | **Region:** Configurable (default `us-east-1`)

### Amazon API Gateway (HTTP API)

- **Type:** HTTP API (lightweight, low-latency)
- **CORS:** Enabled for cross-origin webview requests
- **Health Check:** `GET /cache/healthcheck` returns `{ cached: false }`

### Amazon DynamoDB (NoSQL Database)

| Table | Purpose | Key Schema | TTL |
|-------|---------|------------|-----|
| `codechronicle-backend-summaries-{stage}` | Cached AI file summaries | `fileHash` (HASH) + `filePath` (RANGE) | 7 days |
| `codechronicle-backend-risks-{stage}` | Cached AI risk assessments | `fileHash` (HASH) + `filePath` (RANGE) | 7 days |

**Billing:** PAY_PER_REQUEST (on-demand) -you only pay for what you use.

---

## Feature Deep Dive

### 1. Workspace Scanning and File Discovery

The **WorkspaceScanner** recursively traverses the workspace directory tree, filters files by configured supported extensions (37 by default), excludes directories matching exclude patterns (node_modules, dist, .git, etc.), respects .gitignore patterns, and enforces a max files limit (default: 10,000).

### 2. Multi-Language Dependency Parsing

The **DependencyParser** extracts import/require/include statements from source files using language-specific regex patterns, supporting **15+ programming languages**.

| Language | Detected Patterns |
|----------|-------------------|
| **JavaScript / TypeScript** | `import ... from '...'`, `require('...')`, dynamic `import('...')`, `export ... from '...'` |
| **Python** | `import module`, `from module import ...` |
| **Java** | `import package.Class;` |
| **C / C++** | `#include "header.h"`, `#include <system>` |
| **Go** | `import "package"`, `import (...)` |
| **Ruby** | `require 'file'`, `require_relative 'file'` |
| **Rust** | `use crate::module`, `mod module`, `extern crate` |
| **CSS / SCSS / LESS** | `@import '...'`, `@use '...'`, `@forward '...'` |

### 3. Graph Construction and Metrics Engine

The **GraphBuilder** constructs a directed graph where nodes = source files and edges = dependency relationships.

| Metric | Description |
|--------|-------------|
| **Lines of Code (LOC)** | Total line count of the file |
| **Dependency Count** | Number of files this file imports (out-degree) |
| **Dependent Count** | Number of files that import this file (in-degree) |
| **Centrality Score** | Betweenness centrality -how critical as a connector (0.0–1.0) |
| **Structural Risk Score** | Composite risk from deps, dependents, centrality, LOC (0–100) |

### 4. Interactive Graph Visualization

The **GraphDashboard** renders the dependency graph using **Cytoscape.js** with the **cose-bilkent** force-directed layout.

**Visual encodings:**
- **Node size** (24–70px): Centrality score + dependent count
- **Node color**: File extension (JSX/TSX=cyan, JS=blue, TS=indigo, Python=green, CSS=pink)
- **Border ring color**: Risk level (green=low, yellow=medium, red=high)
- **Edge color on select**: Blue=dependency (outgoing), Purple=dependent (incoming)

**Keyboard shortcuts:**

| Shortcut | Action |
|----------|--------|
| `Esc` | Deselect node / clear search |
| `F` | Fit graph to viewport |
| `Ctrl+F` | Focus the search bar |

### 5. AI-Powered File Summaries

When a user clicks a node, the extension requests an AI summary via Bedrock. Results are cached in DynamoDB (7-day TTL). When Cloud AI is unavailable, a heuristic local fallback summary is generated from structural metrics.

### 6. Blast Radius Prediction

Answers: *"If I change this file, what else could break?"*

Uses BFS traversal following incoming edges. Classifies dependents as direct (1 hop) or indirect (2+ hops). Computes an Impact Score based on the number and importance of affected files.

### 7. Natural Language Query Interface

Lets developers ask questions in plain English. The extension ranks files by relevance, sends context to Bedrock, and returns structured answers with file references and suggested follow-up questions.

**Example queries:**
- "Which files handle authentication?"
- "What are the most critical files in this codebase?"
- "Show me files with database connections"

### 8. Risk Dashboard and Health Overview

Provides codebase-wide health overview: health score gauge (0–100), risk distribution bar, most risky files, most connected files, and exportable Markdown risk reports.

---

## API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/ai/explain` | Generate AI file summary |
| `POST` | `/ai/risk-score` | Produce semantic risk assessment |
| `POST` | `/ai/query` | Answer natural language codebase question |
| `GET` | `/cache/{hash}` | Read cached summaries/risk scores |
| `POST` | `/cache` | Write cache entry |

---

## Database Schema

### Summaries Table

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| `fileHash` | String | Partition Key | MD5 hash of file content |
| `filePath` | String | Sort Key | Workspace-relative file path |
| `summary` | String | -| AI-generated file summary |
| `timestamp` | String | -| ISO 8601 timestamp |
| `ttl` | Number | TTL | Unix epoch expiration (7 days) |

### Risks Table

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| `fileHash` | String | Partition Key | MD5 hash of file content |
| `filePath` | String | Sort Key | Workspace-relative file path |
| `riskFactor` | Map | -| `{ level, score, explanation, factors }` |
| `timestamp` | String | -| ISO 8601 timestamp |
| `ttl` | Number | TTL | Unix epoch expiration (7 days) |

---

## VS Code Commands

| Command | Description |
|---------|----|
| **Scan Workspace** | Scans all workspace files, parses dependencies, builds graph, computes metrics |
| **Open Graph View** | Opens the interactive dependency graph in a webview panel |
| **Ask AI About Codebase** | Opens input for natural language questions |
| **Predict Blast Radius** | Computes blast radius for the active editor file |
| **Refresh Analysis** | Triggers full workspace rescan and graph rebuild |

---

## Extension Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `codechronicle.excludePatterns` | `string[]` | node_modules, dist, .git, etc. | Glob patterns for excluded files |
| `codechronicle.awsApiEndpoint` | `string` | `""` | AWS API Gateway endpoint URL |
| `codechronicle.awsRegion` | `string` | `"us-east-1"` | AWS region |
| `codechronicle.enableCloudAI` | `boolean` | `true` | Enable cloud AI features |
| `codechronicle.maxFiles` | `number` | `10000` | Maximum files to analyze |

---

## Supported Languages

| Language | Extensions |
|----------|-----------|
| **JavaScript** | `.js`, `.jsx`, `.mjs`, `.cjs` |
| **TypeScript** | `.ts`, `.tsx` |
| **Python** | `.py`, `.pyw` |
| **Java** | `.java` |
| **C / C++** | `.c`, `.cpp`, `.cc`, `.cxx`, `.h`, `.hpp`, `.hxx` |
| **C#** | `.cs` |
| **Go** | `.go` |
| **Ruby** | `.rb` |
| **PHP** | `.php` |
| **Rust** | `.rs` |
| **Swift** | `.swift` |
| **Kotlin** | `.kt`, `.kts` |
| **Dart** | `.dart` |
| **Vue / Svelte** | `.vue`, `.svelte` |
| **CSS / SCSS / LESS** | `.css`, `.scss`, `.sass`, `.less` |
| **HTML** | `.html`, `.htm` |

---

## Tech Stack

### Extension (Local)

| Technology | Purpose |
|-----------|---------|
| **VS Code Extension API** | Extension host, commands, file system, webview panels |
| **React 18** | Webview UI component framework |
| **Cytoscape.js + cose-bilkent** | Interactive graph visualization |
| **Zustand** | Lightweight state management |
| **Framer Motion** | Tab transitions and UI animations |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Webpack 5** | Bundling for extension and webview |

### Backend (AWS)

| Technology | Purpose |
|-----------|---------|
| **Serverless Framework v3** | Infrastructure-as-code deployment |
| **Node.js 20.x** | Lambda runtime |
| **@aws-sdk/client-bedrock-runtime** | Bedrock AI model invocation |
| **@aws-sdk/lib-dynamodb** | DynamoDB document client |

---

## Project Structure

```
CodeChronicle/
├── extension/                         # VS Code Extension
│   ├── package.json                   # Extension manifest
│   ├── webpack.config.js              # Dual-target webpack
│   ├── assets/
│   │   └── icon.png                   # Extension icon
│   └── src/
│       ├── extension.js               # Main entry point
│       ├── analyzer/
│       │   ├── scanner.js             # Workspace file discovery
│       │   └── dependencyParser.js    # Multi-language import parser
│       ├── graph/
│       │   ├── graphBuilder.js        # Directed graph construction
│       │   ├── metricsEngine.js       # Centrality, risk, LOC
│       │   └── blastRadius.js         # BFS-based impact analysis
│       ├── ai/
│       │   └── apiClient.js           # AWS API Gateway client
│       ├── utils/
│       │   ├── cacheManager.js        # Local JSON cache
│       │   └── fileWatcher.js         # Incremental file monitoring
│       └── webview/
│           ├── App.jsx                # Root component
│           └── components/            # UI components
│
└── backend/                           # AWS Cloud Backend
    ├── serverless.yml                 # Serverless Framework IaC
    └── lambda/
        ├── aiHandler.js               # /ai/explain + /ai/query
        ├── riskEngine.js              # /ai/risk-score
        └── cacheService.js            # /cache GET + POST
```

---

## Quick Start

### Install from VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"CodeChronicle"**
4. Click **Install**
5. Open the Command Palette (`Ctrl+Shift+P`) and run **CodeChronicle: Show Graph**
6. Click **Scan Workspace** to analyze your project

### Build from Source

```bash
cd extension
npm install
npm run build

# Development mode with hot-reload
npm run dev
```

---

## AWS Backend Deployment

### Prerequisites

1. **AWS Account** with Amazon Bedrock access enabled
2. **Amazon Nova model access** -Request access in the Bedrock console
3. **AWS CLI** configured (`aws configure`)
4. **Node.js 20+**
5. **Serverless Framework** v3 (`npm install -g serverless`)

### Deploy

```bash
cd backend
npm install
npx serverless deploy --stage dev --region us-east-1
```

### Tear Down

```bash
npx serverless remove --stage dev --region us-east-1
```

---

## Security

| Aspect | Implementation |
|--------|----------------|
| **No secrets in extension** | API keys never stored in extension bundle |
| **HTTPS only** | All cloud communication via API Gateway HTTPS |
| **Lambda proxy** | Extension never calls Bedrock directly |
| **IAM least privilege** | Lambda role has minimum required permissions |
| **Content-addressable cache** | DynamoDB keys are content hashes |
| **TTL expiration** | Cached data expires after 7 days |
| **CORS enabled** | API Gateway has CORS configured |

---

## Error Handling and Resilience

| Scenario | Behavior |
|----------|----------|
| **Cloud AI disabled** | All local features work. AI summaries fall back to heuristic descriptions |
| **API Gateway unreachable** | Shows "Offline" status. Local features remain available |
| **Bedrock rate limited** | Retries with exponential backoff. Falls back to cached/structural data |
| **Lambda timeout** | 60-second timeout. Shows error toast and falls back |
| **Network loss** | Continues with deterministic features. Circuit-breaker auto-resets after 5 min |
| **File parse error** | Logs error, skips file, continues processing remaining files |

---

## Design System and UI

CodeChronicle uses a **dark glassmorphism design system** with neon accents, built on Tailwind CSS.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--neon-cyan` | `#22d3ee` | Primary accent, graph highlights |
| `--neon-purple` | `#a78bfa` | Secondary accent, dependent edges |
| `--neon-pink` | `#f472b6` | Tertiary accent, CSS file nodes |
| `--neon-green` | `#4ade80` | Success states, low risk |
| `--neon-blue` | `#60a5fa` | Info states, JS file nodes |

### Typography

| Font | Usage |
|------|-------|
| **Inter** | UI text, labels, descriptions |
| **JetBrains Mono** | Code snippets, file paths, metrics |

---

<p align="center">
  Built with deterministic analysis and AI reasoning.<br/>
  <strong>CodeChronicle</strong> -Understand your code before you change it.<br/><br/>
  <a href="https://marketplace.visualstudio.com/items?itemName=AnujKamalJain.codechronicle">Install from VS Code Marketplace</a>
</p>
