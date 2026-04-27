# chatops_get_pinned_posts

## When to Use

Get all pinned posts in a ChatOps channel. Pinned posts are important messages explicitly marked by channel members. Use this to quickly discover key announcements, decisions, or resources in a channel.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `channelId` | string | ✅ | — | ChatOps channel ID |

## Output

```
## Pinned Posts in `ch_abc123` (2)

1. 📌 **[2024-04-01 09:00]** @admin.user
   Welcome to #general! Please read the team guidelines pinned in #announcements.
   ID: `post_pin1`

2. 📌 **[2024-04-15 14:00]** @jane.smith
   🚨 Production incident runbook: https://wiki.company.com/runbook
   ID: `post_pin2`

---
💡 Use `chatops_get_thread` with a post ID to see full discussion.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid channel | `Failed to get pinned posts: ChatOps HTTP 403/404` |
| No pinned posts | `No pinned posts found in channel \`<id>\`.` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Get pinned posts:**
```
chatops_get_pinned_posts channelId="ch_abc123"
```
