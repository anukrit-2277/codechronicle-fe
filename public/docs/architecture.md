# Architecture

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

## Four-Layer Design

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Analysis Layer** | Local | File scanning, dependency parsing, graph construction, metrics computation |
| **Visualization Layer** | Local | React.js webview with Cytoscape.js graph rendering, Tailwind CSS styling |
| **Cloud Backend Layer** | AWS | Lambda functions behind API Gateway for AI orchestration |
| **AI Layer** | AWS Bedrock | Foundation model inference for summaries, risk analysis, and Q&A |
