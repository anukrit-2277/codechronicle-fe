# Getting Started

## Install from VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for **"CodeChronicle"**
4. Click **Install**
5. Open the Command Palette (`Ctrl+Shift+P`) and run **CodeChronicle: Show Graph**
6. Click **Scan Workspace** to analyze your project

## Build from Source

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

## Website Pricing and Billing Flow

1. Open **Pricing** (`/plans`) from website header or footer.
2. Review plans and click **Buy Now**.
3. If logged in, you are sent to `/billing`.
4. If not logged in, you are sent to `/login?redirect=/billing`.
5. Sign in with the same account used in the extension so credits stay synced.

Credits purchased through billing are account-based and do not expire.
