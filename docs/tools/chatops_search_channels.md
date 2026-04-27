# chatops_search_channels

## When to Use

Search for ChatOps channels by name within a specific team. Use when you know part of a channel's name but not its ID.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamId` | string | ✅ | — | ChatOps team ID |
| `term` | string | ✅ | — | Search term matched against channel name |

## Output

```
## Channels matching "dev" (2)

1. # **DevOps** (`devops`)
   - ID: `ch_aaa`
   - Type: public | Messages: 890

2. 🔒 **DevOps Internal** (`devops-internal`)
   - ID: `ch_bbb`
   - Type: private | Messages: 234

---
💡 Use `chatops_get_channel_posts` with a channel ID to read messages, or `chatops_get_pinned_posts` for pinned content.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| No results | `No channels found matching "<term>" in team \`<id>\`.` |
| Invalid team | `Failed to search channels: ChatOps HTTP 403/404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Search for channels:**
```
chatops_search_channels teamId="abc123xyz" term="devops"
```
