# chatops_get_thread

## When to Use

Get all posts in a thread rooted at a given post ID — the root post and all replies in chronological order. Use this when you see a post with replies and want to read the full conversation context.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `postId` | string | ✅ | — | ID of the root post of the thread |

## Output

```
## Thread (`post_root123`) — 3 message(s)

📌 Root — `post_root123` | **2024-04-26 14:30** | @john.doe
Deployment to production started. ETA 15 minutes.

---
  ↳ Reply — `post_reply1` | **2024-04-26 14:35** | @jane.smith
  Ready on QA side. Go for it!

---
  ↳ Reply — `post_reply2` | **2024-04-26 14:50** | @john.doe
  Deploy complete ✅ v2.4.0 is live.

---
💡 Use `chatops_reply_to_thread` to add a reply to this conversation.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid post ID | `Failed to get thread: ChatOps HTTP 404` |
| No posts | `No posts found in thread \`<id>\`.` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Read a full thread:**
```
chatops_get_thread postId="post_root123"
```
