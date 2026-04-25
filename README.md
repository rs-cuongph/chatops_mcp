# chatops-mcp

MCP server for **ChatOps** — an internal messaging platform. Read teams, channels, and messages; send messages and upload file attachments — all through the Model Context Protocol.

## Features

- 🔍 **Read teams** — list, search, get team details
- 📢 **Read channels** — list, search, get channel info and message history
- 💬 **Read posts** — channel posts with pagination, thread view, pinned posts
- ✉️ **Send messages** — post to channels or reply to threads
- 📎 **File attachments** — upload files and attach them to messages

## Quick Start

### Prerequisites
- Node.js ≥ 20
- A ChatOps Personal Access Token or Bot Token

### Install & Configure

```bash
# Install
npm install -g @cuongph.dev/chatops-mcp

# Configure environment
export CHATOPS_URL=https://chatops.yourcompany.com
export CHATOPS_TOKEN=your_token_here
```

### Claude Desktop Integration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "chatops": {
      "command": "npx",
      "args": ["-y", "@cuongph.dev/chatops-mcp"],
      "env": {
        "CHATOPS_URL": "https://chatops.yourcompany.com",
        "CHATOPS_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CHATOPS_URL` | ✅ | Base URL of your ChatOps instance (no trailing slash) |
| `CHATOPS_TOKEN` | ✅ | Bearer token — Personal Access Token or Bot Token |
| `LOG_LEVEL` | ❌ | `debug \| info \| warn \| error` (default: `info`) |

### Generating a Token

In ChatOps: **Account Settings → Security → Personal Access Tokens → Create**

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
├── chatops/
│   ├── http-client.ts # HTTP client with Bearer auth
│   ├── endpoints.ts   # API v4 URL builders
│   └── mappers.ts     # Raw API → domain types
└── tools/             # One handler per tool
```

## Development

```bash
git clone <repo>
cd chatops-mcp
npm install
cp .env.example .env   # fill in CHATOPS_URL and CHATOPS_TOKEN

npm run dev            # run with tsx (development)
npm test               # vitest unit tests
npx tsc --noEmit       # type check
npm run build          # compile to dist/
```

## License

MIT
