# Tech Stack

## Extension (Local)

| Technology | Purpose |
|-----------|---------|
| **VS Code Extension API** | Extension host, commands, file system, webview panels |
| **React 18** | Webview UI component framework |
| **Cytoscape.js + cose-bilkent** | Interactive graph visualization |
| **Zustand** | Lightweight state management |
| **Framer Motion** | Tab transitions and UI animations |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Webpack 5** | Bundling for extension and webview |

## Backend (AWS)

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
