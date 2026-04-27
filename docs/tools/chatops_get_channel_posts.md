# chatops_get_channel_posts

## When to Use

Retrieve posts from a ChatOps channel ordered newest-first. Each post includes the resolved author `@username`, timestamp, message text, and attachment info. Supports pagination for long channels.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `channelId` | string | ✅ | — | ChatOps channel ID |
| `page` | integer | No | `0` | 0-based page number |
| `perPage` | integer | No | `30` | Posts per page (1–200) |

## Output

```
## Posts in channel `ch_abc123` (30 shown)

1. **[2024-04-26 14:30]** @john.doe
   Deployment to production started. ETA 15 minutes.
   ID: `post_aaa`

2. **[2024-04-26 14:15]** @jane.smith
   QA sign-off complete for v2.4.0 ✅
   📎 1 attachment(s)
   ID: `post_bbb`

  ↳ **[2024-04-26 14:20]** @john.doe
   Thanks Jane! Starting deploy now.
   ID: `post_ccc`

---
💡 Use `chatops_get_thread` with a post ID to see the full thread.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid channel | `Failed to get channel posts: ChatOps HTTP 403/404` |
| No posts | `No posts found in channel \`<id>\`.` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Get latest 30 posts:**
```
chatops_get_channel_posts channelId="ch_abc123"
```

**Paginate (page 2, 20 per page):**
```
chatops_get_channel_posts channelId="ch_abc123" page=1 perPage=20
```
