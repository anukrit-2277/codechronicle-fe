# Feature Deep Dive

## 1. Workspace Scanning and File Discovery

The **WorkspaceScanner** recursively traverses the workspace directory tree, filters files by configured supported extensions (37 by default), excludes directories matching exclude patterns (node_modules, dist, .git, etc.), respects .gitignore patterns, and enforces a max files limit (default: 10,000).

## 2. Multi-Language Dependency Parsing

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

## 3. Graph Construction and Metrics Engine

The **GraphBuilder** constructs a directed graph where nodes = source files and edges = dependency relationships.

| Metric | Description |
|--------|-------------|
| **Lines of Code (LOC)** | Total line count of the file |
| **Dependency Count** | Number of files this file imports (out-degree) |
| **Dependent Count** | Number of files that import this file (in-degree) |
| **Centrality Score** | Betweenness centrality -how critical as a connector (0.0–1.0) |
| **Structural Risk Score** | Composite risk from deps, dependents, centrality, LOC (0–100) |

## 4. Interactive Graph Visualization

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

## 5. AI-Powered File Summaries

When a user clicks a node, the extension requests an AI summary via Bedrock. Results are cached in DynamoDB (7-day TTL). When Cloud AI is unavailable, a heuristic local fallback summary is generated from structural metrics.

## 6. Blast Radius Prediction

Answers: *"If I change this file, what else could break?"*

Uses BFS traversal following incoming edges. Classifies dependents as direct (1 hop) or indirect (2+ hops). Computes an Impact Score based on the number and importance of affected files.

## 7. Natural Language Query Interface

Lets developers ask questions in plain English. The extension ranks files by relevance, sends context to Bedrock, and returns structured answers with file references and suggested follow-up questions.

**Example queries:**
- "Which files handle authentication?"
- "What are the most critical files in this codebase?"
- "Show me files with database connections"

## 8. Risk Dashboard and Health Overview

Provides codebase-wide health overview: health score gauge (0–100), risk distribution bar, most risky files, most connected files, and exportable Markdown risk reports.
