# @melonly-moderation/api-client

[![npm version](https://badge.fury.io/js/%40melonly%2Fapi-client.svg)](https://badge.fury.io/js/%40melonly%2Fapi-client)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/NoahCxrest/MelonlyTSAPIWrapper/workflows/CI/badge.svg)](https://github.com/NoahCxrest/MelonlyTSAPIWrapper/actions)

Official TypeScript client for the Melonly API with type safety and a simple developer experience.

## ✨ Features

- **TypeScript Support** - Type definitions for all API endpoints
- **No External Dependencies**
- **Basic Error Handling**
- **Pagination Support**

## 📦 Installation

```bash
npm install @melonly-moderation/api-client
```

```bash
yarn add @melonly-moderation/api-client
```

```bash
pnpm add @melonly-moderation/api-client
```

## 🚀 Quick Start

```typescript
import { MelonlyClient } from "@melonly-moderation/api-client";

const client = new MelonlyClient({
  token: "your-api-token-here",
});

// Example usage
const serverInfo = await client.getServerInfo();
console.log(serverInfo);
```

## 📖 API Reference

### Client Configuration

```typescript
const client = new MelonlyClient({
  token: "your-api-token", // Required
  // baseUrl?: 'https://api.custom', // Optional
  // timeout?: 30000, // Optional
  // headers?: { ... } // Optional
});
```

### Example Endpoints

```typescript
// Get server info
const server = await client.getServerInfo();

// List applications
const apps = await client.getApplications({ page: 1, limit: 10 });

// Get a specific application
const app = await client.getApplication("application-id");
```

## 🔥 Advanced Usage

Basic error handling is supported. See the API for thrown errors.

## 🔒 Environment Variables

You can use environment variables for your API token:

```env
MELONLY_API_TOKEN=your-production-token-here
```

```typescript
const client = new MelonlyClient({
  token: process.env.MELONLY_API_TOKEN!,
});
```

## 🧪 Testing

```bash
# Run tests
npm test
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/Melonly-Moderation/ts-melonly-client.git
cd ts-melonly-client

# Install dependencies
npm install

# Build the package
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the Melonly team
