# chatops_reply_to_thread

## When to Use

Reply to an existing post/thread in ChatOps. The reply is linked to the root post and appears as a threaded reply. Use `chatops_get_thread` first to read the conversation before replying.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rootPostId` | string | ✅ | — | ID of the root post to reply to |
| `channelId` | string | ✅ | — | Channel ID where the thread exists |
| `message` | string | ✅ | — | Reply message text. Supports Markdown |

## Output

```
## ✅ Reply sent

- **Post ID**: `post_reply123`
- **Thread root**: `post_root456`
- **Channel**: `ch_abc123`
- **Sent at**: 2024-04-26 15:00

> Acknowledged! Will start rollback now.

---
💡 Use `chatops_get_thread` with postId `post_root456` to see the full conversation.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid post ID | `Failed to send reply: ChatOps HTTP 404` |
| Invalid channel | `Failed to send reply: ChatOps HTTP 403` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Reply to a thread:**
```
chatops_reply_to_thread rootPostId="post_root456" channelId="ch_abc123" message="Acknowledged! Will start rollback now."
```
