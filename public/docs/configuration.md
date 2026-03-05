# Configuration

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
