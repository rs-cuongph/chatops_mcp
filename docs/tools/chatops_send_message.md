# chatops_send_message

## When to Use

Post a new message to a ChatOps channel. The message appears as a top-level post (not a thread reply). Supports Markdown formatting.

- To reply to an existing thread → use `chatops_reply_to_thread`
- To send a message with file attachments → use `chatops_send_message_with_files`

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `channelId` | string | ✅ | — | ChatOps channel ID to post into |
| `message` | string | ✅ | — | Message text. Supports Markdown (bold, code, links, lists) |

## Output

```
## ✅ Message sent

- **Post ID**: `post_newmsg123`
- **Channel**: `ch_abc123`
- **Sent at**: 2024-04-26 14:30

> Deployment complete ✅

---
💡 Use `chatops_reply_to_thread` with rootPostId `post_newmsg123` to start a thread, or `chatops_add_reaction` to react to this message.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Empty message | Zod validation error (blocked before API call) |
| Invalid channel | `Failed to send message: ChatOps HTTP 403/404 ...` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Send a plain message:**
```
chatops_send_message channelId="ch_abc123" message="Deployment complete ✅"
```

**Send a Markdown message:**
```
chatops_send_message channelId="ch_abc123" message="**Alert**: Database CPU at 95% — investigating"
```
