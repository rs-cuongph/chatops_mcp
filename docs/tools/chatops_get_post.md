# chatops_get_post

## When to Use

Fetch a single ChatOps post by its ID. Returns the full message, resolved author username, channel, timestamps, and file attachment list. Use this when you have a `postId` from search results, file info, or reactions and need to see the full context.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `postId` | string | ✅ | — | ChatOps post ID |

## Output

```
## Post `post_abc123`

- **Author**  : @john.doe (John Doe)
- **Channel** : `ch_general`
- **Created** : 2024-04-26 14:30
- **Updated** : 2024-04-26 14:31
- **Files**   : 1 attachment(s) — `file_xyz789`

### Message

Deployment to production started. ETA 15 minutes. CC: @devops-team

---
💡 Use `chatops_get_thread` to see the full conversation around this post.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid post ID | `Failed to get post "<id>": ChatOps HTTP 404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Get a post by ID:**
```
chatops_get_post postId="post_abc123"
```
