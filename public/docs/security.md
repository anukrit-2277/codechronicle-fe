# Security & Resilience

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
