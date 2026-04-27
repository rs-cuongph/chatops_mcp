# chatops_list_channels

## When to Use

List all public channels in a ChatOps team. Returns channel ID, name, type, message count, and purpose. Use this after `chatops_list_teams` to explore a team's channels and find the right channel ID.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamId` | string | ✅ | — | ChatOps team ID |
| `page` | integer | No | `0` | 0-based page number |
| `perPage` | integer | No | `60` | Channels per page |

## Output

```
## Channels in team `abc123xyz` (3)

1. # **Town Square** (`town-square`)
   - ID: `ch_aaa`
   - Type: public | Messages: 1,234

2. # **Off-Topic** (`off-topic`)
   - ID: `ch_bbb`
   - Type: public | Messages: 567
   - Purpose: For non-work related discussions

3. 🔒 **DevOps Internal** (`devops-internal`)
   - ID: `ch_ccc`
   - Type: private | Messages: 890

---
💡 Use `chatops_get_channel_posts` with a channel ID to read messages, or `chatops_get_channel` for full channel details.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid team | `Failed to list channels: ChatOps HTTP 403/404` |
| No channels | `No channels found in team \`<id>\`.` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**List all channels:**
```
chatops_list_channels teamId="abc123xyz"
```

**Paginate:**
```
chatops_list_channels teamId="abc123xyz" page=1 perPage=20
```
