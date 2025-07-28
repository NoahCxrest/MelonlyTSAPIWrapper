# @melonly-moderation/api-client

[![npm version](https://badge.fury.io/js/%40melonly%2Fapi-client.svg)](https://badge.fury.io/js/%40melonly%2Fapi-client)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/NoahCxrest/MelonlyTSAPIWrapper/workflows/CI/badge.svg)](https://github.com/NoahCxrest/MelonlyTSAPIWrapper/actions)

Official TypeScript client for the Melonly API with full type safety, zero dependencies, and exceptional developer experience.

## ✨ Features

- 🎯 **Full TypeScript Support** - Complete type definitions for all API endpoints
- 🚀 **Zero Dependencies** - Lightweight and fast with no external dependencies
- 🔄 **Automatic Retries** - Built-in retry logic with exponential backoff
- ⚡ **Rate Limit Handling** - Intelligent rate limit detection and recovery
- 🛡️ **Error Handling** - Comprehensive error types with detailed information
- 📊 **Pagination Support** - Easy-to-use pagination for all list endpoints
- 🧪 **Fully Tested** - Comprehensive test suite with 100% coverage
- 📚 **Excellent Documentation** - Complete API documentation with examples

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
import { MelonlyClient } from '@melonly-moderation/api-client';

// Initialize the client
const client = new MelonlyClient({
  token: 'your-api-token-here'
});

// Get server information
const serverInfo = await client.getServerInfo();
console.log(`Server: ${serverInfo.name}`);

// List applications with pagination
const applications = await client.getApplications({
  page: 1,
  limit: 20
});

console.log(`Found ${applications.total} applications`);

// Get specific application
const app = await client.getApplication('app-id-123');
console.log(`Application: ${app.title}`);
```

## 📖 API Reference

### Client Configuration

```typescript
const client = new MelonlyClient({
  token: 'your-api-token',          // Required: Your API token
  baseUrl?: 'https://api.custom',   // Optional: Custom API base URL
  timeout?: 30000,                  // Optional: Request timeout (ms)
  maxRetries?: 3,                   // Optional: Max retry attempts
  debug?: false,                    // Optional: Enable debug logging
  headers?: {                       // Optional: Custom headers
    'Custom-Header': 'value'
  }
});
```

### Applications

```typescript
// List all applications
const apps = await client.getApplications({ page: 1, limit: 10 });

// Get specific application
const app = await client.getApplication('application-id');

// Get application responses
const responses = await client.getApplicationResponses('application-id');

// Get user's application responses
const userResponses = await client.getUserApplicationResponses('user-id');
```

### Server Management

```typescript
// Get server information
const server = await client.getServerInfo();

// Get audit logs
const auditLogs = await client.getAuditLogs({ page: 1, limit: 50 });

// Get join requests
const joinRequests = await client.getJoinRequests();

// Get specific join request
const joinRequest = await client.getJoinRequest('user-id');
```

### Members & Roles

```typescript
// List server members
const members = await client.getMembers();

// Get specific member
const member = await client.getMember('member-id');

// Get member by Discord ID
const discordMember = await client.getMemberByDiscordId('discord-user-id');

// List roles
const roles = await client.getRoles();

// Get specific role
const role = await client.getRole('role-id');
```

### Logs & Moderation

```typescript
// Get all logs
const logs = await client.getLogs({ page: 1, limit: 100 });

// Get specific log
const log = await client.getLog('log-id');

// Get logs by staff member
const staffLogs = await client.getStaffLogs('staff-id');

// Get logs for specific user
const userLogs = await client.getUserLogs('username');
```

### Leave of Absence (LOA)

```typescript
// List all LOAs
const loas = await client.getLOAs();

// Get specific LOA
const loa = await client.getLOA('loa-id');

// Get user's LOAs
const userLoas = await client.getUserLOAs('member-id');
```

### Shifts

```typescript
// List all shifts
const shifts = await client.getShifts();

// Get specific shift
const shift = await client.getShift('shift-id');
```

## 🔥 Advanced Usage

### Error Handling

```typescript
import { 
  MelonlyError, 
  NetworkError, 
  RateLimitError, 
  ValidationError,
  isMelonlyError,
  isRateLimitError 
} from '@melonly-moderation/api-client';

try {
  const server = await client.getServerInfo();
} catch (error) {
  if (isRateLimitError(error)) {
    console.log(`Rate limited! Retry after ${error.retryAfterSeconds} seconds`);
    console.log(`Rate limit resets at: ${error.resetDate}`);
  } else if (isMelonlyError(error)) {
    console.log(`API Error ${error.status}: ${error.message}`);
    console.log('Error details:', error.details);
  } else if (error instanceof NetworkError) {
    console.log('Network error:', error.message);
  } else if (error instanceof ValidationError) {
    console.log(`Validation error in ${error.field}:`, error.message);
  }
}
```

### Pagination

```typescript
// Manual pagination
let page = 1;
let hasMore = true;

while (hasMore) {
  const response = await client.getApplications({ page, limit: 50 });
  
  console.log(`Processing page ${page}/${response.totalPages}`);
  
  // Process applications
  for (const app of response.data) {
    console.log(`Application: ${app.title}`);
  }
  
  hasMore = page < response.totalPages;
  page++;
}

// Helper function for auto-pagination
async function* getAllApplications() {
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await client.getApplications({ page, limit: 100 });
    
    for (const app of response.data) {
      yield app;
    }
    
    hasMore = page < response.totalPages;
    page++;
  }
}

// Usage
for await (const app of getAllApplications()) {
  console.log(`Application: ${app.title}`);
}
```

### Custom Configuration

```typescript
// Production configuration
const prodClient = new MelonlyClient({
  token: process.env.MELONLY_API_TOKEN!,
  timeout: 60000,     // 1 minute timeout
  maxRetries: 5,      // More retries for production
  headers: {
    'X-Client-Version': '1.0.0',
    'X-Environment': 'production'
  }
});

// Development configuration with debugging
const devClient = new MelonlyClient({
  token: process.env.MELONLY_DEV_TOKEN!,
  debug: true,        // Enable debug logs
  timeout: 10000,     // Shorter timeout for dev
  maxRetries: 1       // Fail fast in development
});
```

## 🔒 Environment Variables

Create a `.env` file in your project root:

```env
MELONLY_API_TOKEN=your-production-token-here
MELONLY_DEV_TOKEN=your-development-token-here
```

Then use in your code:

```typescript
const client = new MelonlyClient({
  token: process.env.MELONLY_API_TOKEN!
});
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/NoahCxrest/MelonlyTSAPIWrapper.git
cd melonly-api-client

# Install dependencies
npm install

# Start development mode
npm run dev

# Build the package
npm run build

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run typecheck
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the Melonly team