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
