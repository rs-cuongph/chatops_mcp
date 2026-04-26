# chatops-mcp

MCP server for **ChatOps** — an internal messaging platform. Read teams, channels, and messages; send messages and upload file attachments — all through the Model Context Protocol.

Authentication uses **SSO session cookies** captured via Playwright — no Personal Access Token required.

## Features

- 🔐 **SSO Authentication** — login once via browser; session persisted to disk
- 🔍 **Read teams** — list, search, get team details
- 📢 **Read channels** — list, search, get channel info and message history
- 💬 **Read posts** — channel posts with pagination, thread view, pinned posts
- ✉️ **Send messages** — post to channels or reply to threads
- 📎 **File attachments** — upload files and attach them to messages
- 😀 **Reactions & Emoji** — add reactions, browse custom emoji

## Quick Start

### Prerequisites

- Node.js ≥ 20
- Access to your ChatOps instance (SSO login credentials)

### 1. Install

```bash
npm install -g @cuongph.dev/chatops-mcp
```

### 2. Authenticate (one-time)

```bash
# Opens a browser window — complete the SSO login, then close the browser
chatops-auth-login
```

The session is saved to `.chatops/session.json` and reused on every subsequent request. Re-run `chatops-auth-login` when the session expires.

### 3. Verify

```bash
chatops-auth-check
```

### 4. Configure your MCP client

**Claude Desktop** — add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "chatops": {
      "command": "npx",
      "args": ["-y", "@cuongph.dev/chatops-mcp"],
      "env": {
        "CHATOPS_URL": "https://chatops.yourcompany.com",
        "CHATOPS_SESSION_FILE": "/absolute/path/to/.chatops/session.json"
      }
    }
  }
}
```

> **Tip**: Use an absolute path for `CHATOPS_SESSION_FILE` — MCP clients may run from a different working directory than where you ran `chatops-auth-login`.

**Cursor** — add to `~/.cursor/mcp.json` with the same structure above.

## Auth CLI

| Command | Description |
|---------|-------------|
| `chatops-auth-login` | Opens browser, completes SSO, saves session |
| `chatops-auth-check` | Validates the stored session against the API |
| `chatops-auth-clear` | Removes the stored session file |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CHATOPS_URL` | ✅ | Base URL of your ChatOps instance (no trailing slash) |
| `CHATOPS_SESSION_FILE` | ❌ | Path to session file (default: `.chatops/session.json`) |
| `CHATOPS_VALIDATE_PATH` | ❌ | API path to validate session (default: `/api/v4/users/me`) |
| `PLAYWRIGHT_HEADLESS` | ❌ | `true\|false` — headless browser for login (default: `false`) |
| `PLAYWRIGHT_BROWSER` | ❌ | `chromium\|firefox\|webkit` (default: `chromium`) |
| `LOG_LEVEL` | ❌ | `debug\|info\|warn\|error` (default: `info`) |

## Available Tools

### Teams

| Tool | Description |
|------|-------------|
| `chatops_list_teams` | List all accessible teams |
| `chatops_search_teams` | Search teams by name |
| `chatops_get_team` | Get details for a specific team |

### Channels

| Tool | Description |
|------|-------------|
| `chatops_list_channels` | List public channels in a team |
| `chatops_search_channels` | Search channels in a team |
| `chatops_get_channel` | Get channel details (by ID or name) |
| `chatops_get_channel_posts` | Read messages in a channel |

### Threads & Pinned

| Tool | Description |
|------|-------------|
| `chatops_get_thread` | Read a full message thread |
| `chatops_get_pinned_posts` | Get pinned posts in a channel |

### Messaging

| Tool | Description |
|------|-------------|
| `chatops_send_message` | Send a new message to a channel |
| `chatops_reply_to_thread` | Reply to an existing thread |
| `chatops_upload_file` | Upload a file (returns fileId) |
| `chatops_send_message_with_files` | Send message with file attachments |

### Reactions & Emoji

| Tool | Description |
|------|-------------|
| `chatops_get_reactions` | List emoji reactions on a post |
| `chatops_add_reaction` | Add an emoji reaction to a post |
| `chatops_get_emoji` | Look up custom emoji (by ID, name, or list all) |

## Common Workflows

### Browse and read a channel

```
1. chatops_list_teams              → get teamId
2. chatops_list_channels teamId    → get channelId
3. chatops_get_channel_posts channelId → read messages
4. chatops_get_thread postId       → dive into a thread
```

### Send a message with a file

```
1. chatops_upload_file channelId filePath  → get fileId
2. chatops_send_message_with_files channelId message [fileId]
```

## Architecture

```
src/
├── server.ts          # MCP server entry, tool registration
├── config.ts          # Zod env validation
├── errors.ts          # Structured error types
├── types.ts           # Normalized domain types
├── auth/
│   ├── session-store.ts    # Read/write/clear session file
│   ├── session-manager.ts  # Cookie extraction & session validation
│   └── playwright-auth.ts  # Interactive SSO login via Playwright
├── cli/
│   ├── auth-login.ts  # chatops-auth-login binary
│   ├── auth-check.ts  # chatops-auth-check binary
│   └── auth-clear.ts  # chatops-auth-clear binary
├── chatops/
│   ├── http-client.ts # HTTP client with session cookie auth
│   ├── endpoints.ts   # API v4 URL builders
│   └── mappers.ts     # Raw API → domain types
└── tools/             # One handler per tool
```

## Development

```bash
git clone <repo>
cd chatops-mcp
npm install
cp .env.example .env   # fill in CHATOPS_URL

# Authenticate
npm run chatops-auth-login

npm run dev            # run with tsx (development)
npm test               # vitest unit tests
npx tsc --noEmit       # type check
npm run build          # compile to dist/
```

## License

MIT
