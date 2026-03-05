# AWS Services Used

## Amazon Bedrock (AI/ML)

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

## AWS Lambda (Serverless Compute)

Five Lambda functions handle all backend logic, deployed via the Serverless Framework:

| Function | Handler | Timeout | Purpose |
|----------|---------|---------|---------|
| `aiExplain` | `lambda/aiHandler.explain` | 60s | Generates AI file summaries |
| `aiRiskScore` | `lambda/riskEngine.assessRisk` | 60s | Produces semantic risk assessments |
| `aiQuery` | `lambda/aiHandler.query` | 60s | Answers natural language codebase questions |
| `cacheGet` | `lambda/cacheService.get` | 30s | Reads cached summaries and risk scores |
| `cachePut` | `lambda/cacheService.put` | 30s | Writes cache entries |

**Runtime:** Node.js 20.x | **Memory:** 512 MB | **Region:** Configurable (default `us-east-1`)

## Amazon API Gateway (HTTP API)

- **Type:** HTTP API (lightweight, low-latency)
- **CORS:** Enabled for cross-origin webview requests
- **Health Check:** `GET /cache/healthcheck` returns `{ cached: false }`

## Amazon DynamoDB (NoSQL Database)

| Table | Purpose | Key Schema | TTL |
|-------|---------|------------|-----|
| `codechronicle-backend-summaries-{stage}` | Cached AI file summaries | `fileHash` (HASH) + `filePath` (RANGE) | 7 days |
| `codechronicle-backend-risks-{stage}` | Cached AI risk assessments | `fileHash` (HASH) + `filePath` (RANGE) | 7 days |

**Billing:** PAY_PER_REQUEST (on-demand) — you only pay for what you use.
