# chatops_get_channel

## When to Use

Get detailed metadata for a specific ChatOps channel. Can look up by `channelId` (preferred) or by `teamId` + `channelName` (slug). Returns type, message count, purpose, and header.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `channelId` | string | No | — | ChatOps channel ID (preferred lookup) |
| `teamId` | string | No | — | Team ID — required when looking up by `channelName` |
| `channelName` | string | No | — | Channel slug — used only when `channelId` is not provided |

At least `channelId` **or** both `teamId` + `channelName` must be provided.

## Output

```
## # Town Square

- **ID**: `ch_abc123`
- **Name (slug)**: `town-square`
- **Team ID**: `team_xyz`
- **Type**: public
- **Total messages**: 1,234
- **Last post**: 2024-04-26 14:30
- **Purpose**: Team announcements and general discussion

---
💡 Use `chatops_get_channel_posts` to read messages, or `chatops_get_pinned_posts` for pinned content in this channel.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Channel not found | `Failed to get channel: ChatOps HTTP 404` |
| Missing params | Zod validation error |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Look up by channel ID:**
```
chatops_get_channel channelId="ch_abc123"
```

**Look up by name:**
```
chatops_get_channel teamId="team_xyz" channelName="town-square"
```
