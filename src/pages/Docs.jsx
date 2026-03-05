import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Docs() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#020617] text-white/80">
            {/* Top bar */}
            <div className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <span className="text-white/15">|</span>
                    <div className="flex items-center gap-2">
                        <img src="/logo1.png" alt="CodeChronicle" className="w-6 h-6 object-contain brightness-110" style={{ mixBlendMode: 'screen' }} />
                        <span className="text-sm font-semibold text-white/70">Documentation</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <article className="docs-content">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <img src="/logo1.png" alt="CodeChronicle" className="w-24 h-24 object-contain mx-auto mb-6 brightness-110" style={{ mixBlendMode: 'screen' }} />
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            CodeChronicle <span className="text-neon-cyan">⚡</span>
                        </h1>
                        <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                            AI-Powered VS Code Extension for Codebase Understanding, Interactive Dependency Graphs, Blast Radius Prediction, and Natural Language Exploration
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                            <a href="https://marketplace.visualstudio.com/items?itemName=AnujKamalJain.codechronicle" target="_blank" rel="noopener noreferrer">
                                <img src="https://img.shields.io/badge/VS%20Code-Marketplace-blue?logo=visual-studio-code&style=for-the-badge" alt="VS Code Marketplace" />
                            </a>
                            <img src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&style=for-the-badge" alt="JavaScript" />
                            <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&style=for-the-badge" alt="React" />
                            <img src="https://img.shields.io/badge/AWS-Bedrock%20|%20Lambda%20|%20DynamoDB-FF9900?logo=amazon-aws&style=for-the-badge" alt="AWS" />
                            <img src="https://img.shields.io/badge/Serverless-Framework%20v3-FD5750?logo=serverless&style=for-the-badge" alt="Serverless" />
                            <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
                        </div>
                    </div>

                    {/* Table of Contents */}
                    <Section title="Table of Contents">
                        <ul className="space-y-1.5 text-neon-cyan/70">
                            {[
                                'Overview', 'Key Features', 'Architecture', 'AWS Services Used',
                                'Feature Deep Dive', 'Data Flow', 'API Endpoints', 'Database Schema',
                                'AI Prompts and Models', 'Extension ↔ Webview Message Protocol',
                                'VS Code Commands', 'Extension Configuration', 'Supported Languages',
                                'Tech Stack', 'Project Structure', 'Quick Start', 'AWS Backend Deployment',
                                'Development', 'Packaging and Distribution', 'Security',
                                'Error Handling and Resilience', 'Design System and UI',
                            ].map((item, i) => (
                                <li key={i}>
                                    <a href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:text-neon-cyan transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    {/* Overview */}
                    <Section title="Overview" id="overview">
                        <P>
                            CodeChronicle is a VS Code extension designed to help developers understand and safely modify large, complex codebases. It combines <strong>deterministic local static analysis</strong> with <strong>cloud-powered AI reasoning</strong> (Amazon Bedrock) to provide deep codebase insights without leaving your editor.
                        </P>
                        <P>
                            The core philosophy is <strong>local-first</strong>: all structural analysis (scanning, parsing, graph building, metrics, blast radius) runs entirely on your machine. Cloud AI features (file summaries, semantic risk scoring, natural language Q&A) are optional and powered by AWS services when enabled.
                        </P>
                    </Section>

                    {/* Key Features */}
                    <Section title="Key Features" id="key-features">
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Description</th>
                                        <th>Requires Cloud</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Tr cells={['Multi-Language Dependency Graph', 'Interactive Cytoscape.js graph supporting 15+ languages', 'No']} />
                                    <Tr cells={['Blast Radius Prediction', 'BFS-based transitive impact analysis before you change a line', 'No']} />
                                    <Tr cells={['AI File Summaries', '2-3 sentence explanations of what each file does and why', 'Yes']} />
                                    <Tr cells={['Semantic Risk Scoring', 'AI-assessed risk based on side effects, security, coupling', 'Yes']} />
                                    <Tr cells={['Structural Risk Scoring', 'Deterministic risk from dependency count, centrality, LOC', 'No']} />
                                    <Tr cells={['Natural Language Q&A', 'Ask questions about your codebase in plain English', 'Yes']} />
                                    <Tr cells={['Risk Health Dashboard', 'Codebase-wide risk distribution, health score, export reports', 'No']} />
                                    <Tr cells={['Graph Search & Filter', 'Real-time node search by name and path with highlighting', 'No']} />
                                    <Tr cells={['Incremental Updates', 'File watcher auto-updates the graph on file changes', 'No']} />
                                    <Tr cells={['Smart Caching', 'DynamoDB cloud cache (7-day TTL) + local JSON cache', 'Hybrid']} />
                                    <Tr cells={['Premium Dark UI', 'Glassmorphism design with neon accents and smooth animations', 'No']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Architecture */}
                    <Section title="Architecture" id="architecture">
                        <CodeBlock>{`┌──────────────────────────────────────────────────────────────────────┐
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
               └────────────────────────┘`}</CodeBlock>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-4">Four-Layer Design</h3>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Layer</th><th>Location</th><th>Responsibility</th></tr></thead>
                                <tbody>
                                    <Tr cells={['Analysis Layer', 'Local', 'File scanning, dependency parsing, graph construction, metrics computation']} />
                                    <Tr cells={['Visualization Layer', 'Local', 'React.js webview with Cytoscape.js graph rendering, Tailwind CSS styling']} />
                                    <Tr cells={['Cloud Backend Layer', 'AWS', 'Lambda functions behind API Gateway for AI orchestration']} />
                                    <Tr cells={['AI Layer', 'AWS Bedrock', 'Foundation model inference for summaries, risk analysis, and Q&A']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* AWS Services */}
                    <Section title="AWS Services Used" id="aws-services-used">
                        <h3 className="text-xl font-semibold text-white/80 mb-3">Amazon Bedrock (AI/ML)</h3>
                        <P>Amazon Bedrock provides the foundation model inference that powers all AI features. CodeChronicle uses the <strong>Amazon Nova</strong> family of models via the Bedrock <strong>Converse API</strong>.</P>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Model</th><th>Usage</th></tr></thead>
                                <tbody>
                                    <Tr cells={['us.amazon.nova-premier-v1:0', 'Primary model for file summaries, risk scoring, and Q&A']} />
                                    <Tr cells={['us.amazon.nova-lite-v1:0', 'Fallback model when Premier is unavailable']} />
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">AWS Lambda (Serverless Compute)</h3>
                        <P>Five Lambda functions handle all backend logic, deployed via the Serverless Framework:</P>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Function</th><th>Handler</th><th>Timeout</th><th>Purpose</th></tr></thead>
                                <tbody>
                                    <Tr cells={['aiExplain', 'lambda/aiHandler.explain', '60s', 'Generates AI file summaries']} />
                                    <Tr cells={['aiRiskScore', 'lambda/riskEngine.assessRisk', '60s', 'Produces semantic risk assessments']} />
                                    <Tr cells={['aiQuery', 'lambda/aiHandler.query', '60s', 'Answers natural language codebase questions']} />
                                    <Tr cells={['cacheGet', 'lambda/cacheService.get', '30s', 'Reads cached summaries and risk scores']} />
                                    <Tr cells={['cachePut', 'lambda/cacheService.put', '30s', 'Writes cache entries']} />
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">Amazon DynamoDB (NoSQL Database)</h3>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Table</th><th>Purpose</th><th>Key Schema</th><th>TTL</th></tr></thead>
                                <tbody>
                                    <Tr cells={['codechronicle-backend-summaries-{stage}', 'Cached AI file summaries', 'fileHash (HASH) + filePath (RANGE)', '7 days']} />
                                    <Tr cells={['codechronicle-backend-risks-{stage}', 'Cached AI risk assessments', 'fileHash (HASH) + filePath (RANGE)', '7 days']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Feature Deep Dive */}
                    <Section title="Feature Deep Dive" id="feature-deep-dive">
                        <h3 className="text-xl font-semibold text-white/80 mb-3">1. Workspace Scanning and File Discovery</h3>
                        <P>The <strong>WorkspaceScanner</strong> recursively traverses the workspace directory tree, filters files by configured supported extensions (37 by default), excludes directories matching exclude patterns (node_modules, dist, .git, etc.), respects .gitignore patterns, and enforces a max files limit (default: 10,000).</P>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">2. Multi-Language Dependency Parsing</h3>
                        <P>The <strong>DependencyParser</strong> extracts import/require/include statements from source files using language-specific regex patterns, supporting <strong>15+ programming languages</strong>.</P>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Language</th><th>Detected Patterns</th></tr></thead>
                                <tbody>
                                    <Tr cells={['JavaScript / TypeScript', "import ... from '...', require('...'), dynamic import('...'), export ... from '...'"]} />
                                    <Tr cells={['Python', 'import module, from module import ...']} />
                                    <Tr cells={['Java', 'import package.Class;']} />
                                    <Tr cells={['C / C++', '#include "header.h", #include <system>']} />
                                    <Tr cells={['Go', 'import "package", import (...)']} />
                                    <Tr cells={['Ruby', "require 'file', require_relative 'file'"]} />
                                    <Tr cells={['Rust', 'use crate::module, mod module, extern crate']} />
                                    <Tr cells={['CSS / SCSS / LESS', "@import '...', @use '...', @forward '...'"]} />
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">3. Graph Construction and Metrics Engine</h3>
                        <P>The <strong>GraphBuilder</strong> constructs a directed graph where nodes = source files and edges = dependency relationships. The <strong>MetricsEngine</strong> computes:</P>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Metric</th><th>Description</th></tr></thead>
                                <tbody>
                                    <Tr cells={['Lines of Code (LOC)', 'Total line count of the file']} />
                                    <Tr cells={['Dependency Count', 'Number of files this file imports (out-degree)']} />
                                    <Tr cells={['Dependent Count', 'Number of files that import this file (in-degree)']} />
                                    <Tr cells={['Centrality Score', 'Betweenness centrality — how critical as a connector (0.0–1.0)']} />
                                    <Tr cells={['Structural Risk Score', 'Composite risk from deps, dependents, centrality, LOC (0–100)']} />
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">4. Interactive Graph Visualization</h3>
                        <P>The <strong>GraphDashboard</strong> renders the dependency graph using <strong>Cytoscape.js</strong> with the <strong>cose-bilkent</strong> force-directed layout. Nodes are sized by centrality/dependents, colored by file type, and have risk-level borders (green/yellow/red). Clicking a node highlights its neighbors and shows file details.</P>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">5. AI-Powered File Summaries</h3>
                        <P>When a user clicks a node, the extension requests an AI summary via Bedrock. Results are cached in DynamoDB (7-day TTL). When Cloud AI is unavailable, a heuristic local fallback summary is generated from structural metrics.</P>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">6. Blast Radius Prediction</h3>
                        <P>Answers: <em>"If I change this file, what else could break?"</em> Uses BFS traversal following incoming edges. Classifies dependents as direct (1 hop) or indirect (2+ hops). Computes an Impact Score based on the number and importance of affected files.</P>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">7. Natural Language Query Interface</h3>
                        <P>Lets developers ask questions in plain English like "Which files handle authentication?" The extension ranks files by relevance, sends context to Bedrock, and returns structured answers with file references and suggested follow-up questions.</P>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">8. Risk Dashboard</h3>
                        <P>Provides codebase-wide health overview: health score gauge, risk distribution bar, most risky files, most connected files, and exportable Markdown risk reports.</P>
                    </Section>

                    {/* API Endpoints */}
                    <Section title="API Endpoints" id="api-endpoints">
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Method</th><th>Path</th><th>Purpose</th></tr></thead>
                                <tbody>
                                    <Tr cells={['POST', '/ai/explain', 'Generate AI file summary']} />
                                    <Tr cells={['POST', '/ai/risk-score', 'Produce semantic risk assessment']} />
                                    <Tr cells={['POST', '/ai/query', 'Answer natural language codebase question']} />
                                    <Tr cells={['GET', '/cache/{hash}', 'Read cached summaries/risk scores']} />
                                    <Tr cells={['POST', '/cache', 'Write cache entry']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* VS Code Commands */}
                    <Section title="VS Code Commands" id="vs-code-commands">
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Command</th><th>Description</th></tr></thead>
                                <tbody>
                                    <Tr cells={['Scan Workspace', 'Scans all workspace files, parses dependencies, builds the graph, and computes metrics']} />
                                    <Tr cells={['Open Graph View', 'Opens the main interactive dependency graph in a webview panel']} />
                                    <Tr cells={['Ask AI About Codebase', 'Opens input for natural language questions']} />
                                    <Tr cells={['Predict Blast Radius', 'Computes blast radius for the active editor file']} />
                                    <Tr cells={['Refresh Analysis', 'Triggers a full workspace rescan and graph rebuild']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Supported Languages */}
                    <Section title="Supported Languages" id="supported-languages">
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Language</th><th>Extensions</th></tr></thead>
                                <tbody>
                                    <Tr cells={['JavaScript', '.js, .jsx, .mjs, .cjs']} />
                                    <Tr cells={['TypeScript', '.ts, .tsx']} />
                                    <Tr cells={['Python', '.py, .pyw']} />
                                    <Tr cells={['Java', '.java']} />
                                    <Tr cells={['C / C++', '.c, .cpp, .cc, .cxx, .h, .hpp, .hxx']} />
                                    <Tr cells={['C#', '.cs']} />
                                    <Tr cells={['Go', '.go']} />
                                    <Tr cells={['Ruby', '.rb']} />
                                    <Tr cells={['PHP', '.php']} />
                                    <Tr cells={['Rust', '.rs']} />
                                    <Tr cells={['Swift', '.swift']} />
                                    <Tr cells={['Kotlin', '.kt, .kts']} />
                                    <Tr cells={['Dart', '.dart']} />
                                    <Tr cells={['Vue / Svelte', '.vue, .svelte']} />
                                    <Tr cells={['CSS / SCSS / LESS', '.css, .scss, .sass, .less']} />
                                    <Tr cells={['HTML', '.html, .htm']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Tech Stack */}
                    <Section title="Tech Stack" id="tech-stack">
                        <h3 className="text-xl font-semibold text-white/80 mb-3">Extension (Local)</h3>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Technology</th><th>Purpose</th></tr></thead>
                                <tbody>
                                    <Tr cells={['VS Code Extension API', 'Extension host, commands, file system, webview panels']} />
                                    <Tr cells={['React 18', 'Webview UI component framework']} />
                                    <Tr cells={['Cytoscape.js + cose-bilkent', 'Interactive graph visualization']} />
                                    <Tr cells={['Zustand', 'Lightweight state management']} />
                                    <Tr cells={['Framer Motion', 'Tab transitions and UI animations']} />
                                    <Tr cells={['Tailwind CSS 3', 'Utility-first CSS framework']} />
                                    <Tr cells={['Webpack 5', 'Bundling for extension and webview']} />
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">Backend (AWS)</h3>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Technology</th><th>Purpose</th></tr></thead>
                                <tbody>
                                    <Tr cells={['Serverless Framework v3', 'Infrastructure-as-code deployment']} />
                                    <Tr cells={['Node.js 20.x', 'Lambda runtime']} />
                                    <Tr cells={['@aws-sdk/client-bedrock-runtime', 'Bedrock AI model invocation']} />
                                    <Tr cells={['@aws-sdk/lib-dynamodb', 'DynamoDB document client']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Project Structure */}
                    <Section title="Project Structure" id="project-structure">
                        <CodeBlock>{`CodeChronicle/
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
        └── cacheService.js            # /cache GET + POST`}</CodeBlock>
                    </Section>

                    {/* Quick Start */}
                    <Section title="Quick Start" id="quick-start">
                        <h3 className="text-xl font-semibold text-white/80 mb-3">Install from VS Code Marketplace</h3>
                        <ol className="list-decimal list-inside space-y-2 text-white/55 text-sm leading-relaxed">
                            <li>Open VS Code</li>
                            <li>Go to Extensions (<code className="docs-code">Ctrl+Shift+X</code>)</li>
                            <li>Search for <strong>"CodeChronicle"</strong></li>
                            <li>Click <strong>Install</strong></li>
                            <li>Open the Command Palette (<code className="docs-code">Ctrl+Shift+P</code>) and run <strong>CodeChronicle: Show Graph</strong></li>
                            <li>Click <strong>Scan Workspace</strong> to analyze your project</li>
                        </ol>

                        <h3 className="text-xl font-semibold text-white/80 mt-8 mb-3">Build from Source</h3>
                        <CodeBlock>{`cd extension
npm install
npm run build

# Development mode with hot-reload
npm run dev`}</CodeBlock>
                    </Section>

                    {/* Security */}
                    <Section title="Security" id="security">
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Aspect</th><th>Implementation</th></tr></thead>
                                <tbody>
                                    <Tr cells={['No secrets in extension', 'API keys and credentials are never stored in the bundle']} />
                                    <Tr cells={['HTTPS only', 'All cloud communication goes through API Gateway HTTPS']} />
                                    <Tr cells={['Lambda proxy', 'Extension never calls Bedrock directly']} />
                                    <Tr cells={['IAM least privilege', 'Lambda role has only minimum required permissions']} />
                                    <Tr cells={['Content-addressable cache', 'DynamoDB keys are content hashes, preventing stale data']} />
                                    <Tr cells={['TTL expiration', 'Cached data automatically expires after 7 days']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Error Handling */}
                    <Section title="Error Handling and Resilience" id="error-handling-and-resilience">
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Scenario</th><th>Behavior</th></tr></thead>
                                <tbody>
                                    <Tr cells={['Cloud AI disabled', 'All local features work normally. AI summaries fall back to heuristic descriptions']} />
                                    <Tr cells={['API Gateway unreachable', 'Extension shows "Offline" status. Local features remain available']} />
                                    <Tr cells={['Bedrock rate limited', 'Retries with exponential backoff. Falls back to cached/structural data']} />
                                    <Tr cells={['Lambda timeout', '60-second timeout. Shows error toast and falls back to structural data']} />
                                    <Tr cells={['Network loss', 'Continues with deterministic features. Circuit-breaker auto-resets after 5 min']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Design System */}
                    <Section title="Design System and UI" id="design-system-and-ui">
                        <P>CodeChronicle uses a <strong>dark glassmorphism design system</strong> with neon accents, built on Tailwind CSS.</P>
                        <div className="overflow-x-auto">
                            <table className="docs-table">
                                <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
                                <tbody>
                                    <Tr cells={['--neon-cyan', '#22d3ee', 'Primary accent, graph highlights']} />
                                    <Tr cells={['--neon-purple', '#a78bfa', 'Secondary accent, dependent edges']} />
                                    <Tr cells={['--neon-pink', '#f472b6', 'Tertiary accent, CSS file nodes']} />
                                    <Tr cells={['--neon-green', '#4ade80', 'Success states, low risk']} />
                                    <Tr cells={['--neon-blue', '#60a5fa', 'Info states, JS file nodes']} />
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Footer tagline */}
                    <div className="mt-20 pt-10 border-t border-white/5 text-center">
                        <p className="text-white/30 text-sm">
                            Built with deterministic analysis and AI reasoning.
                        </p>
                        <p className="text-white/50 font-semibold mt-2">
                            CodeChronicle — Understand your code before you change it.
                        </p>
                        <a
                            href="https://marketplace.visualstudio.com/items?itemName=AnujKamalJain.codechronicle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-neon-cyan/70 hover:text-neon-cyan text-sm transition-colors"
                        >
                            Install from VS Code Marketplace →
                        </a>
                    </div>
                </article>
            </div>
        </div>
    )
}

/* Reusable components */
function Section({ title, id, children }) {
    const sectionId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return (
        <section id={sectionId} className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white/90 mb-6 pb-3 border-b border-white/[0.06]">
                {title}
            </h2>
            {children}
        </section>
    )
}

function P({ children }) {
    return <p className="text-white/55 text-sm leading-relaxed mb-4">{children}</p>
}

function CodeBlock({ children }) {
    return (
        <pre className="bg-[#0a0f1e] border border-white/[0.06] rounded-xl p-5 overflow-x-auto text-xs sm:text-sm font-mono text-white/50 leading-relaxed my-4">
            <code>{children}</code>
        </pre>
    )
}

function Tr({ cells }) {
    return (
        <tr>
            {cells.map((cell, i) => (
                <td key={i}>{cell}</td>
            ))}
        </tr>
    )
}
