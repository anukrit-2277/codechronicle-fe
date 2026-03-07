# API Reference

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
