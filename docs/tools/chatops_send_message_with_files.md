# chatops_send_message_with_files

## When to Use

Send a message with one or more file attachments to a ChatOps channel. Files must be uploaded first with `chatops_upload_file` to get their `fileId`s.

**Workflow**: `chatops_upload_file` → get `fileId` → `chatops_send_message_with_files`

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `channelId` | string | ✅ | — | Channel ID to post into |
| `message` | string | ✅ | — | Message text. Supports Markdown |
| `fileIds` | string[] | ✅ | — | Array of file IDs from `chatops_upload_file` |
| `rootPostId` | string | No | — | If set, sends as a thread reply to this post |

## Output

```
## ✅ Message with files sent

- **Post ID**: `post_abc123`
- **Channel**: `ch_general`
- **Attachments**: 1 file(s)
- **Sent at**: 2024-04-26 14:30

> Please review the attached Q1 report.

**Attached files:**
1. q1_report.pdf (1.2 MB) — `file_xyz789`

---
💡 Use `chatops_reply_to_thread` with rootPostId `post_abc123` to continue the thread, or `chatops_get_post` to verify the message.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Empty fileIds | `fileIds must not be empty. Use chatops_send_message for text-only messages.` |
| Invalid file ID | `Failed to send message with files: ChatOps HTTP 400/404` |
| Invalid channel | `Failed to send message with files: ChatOps HTTP 403` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Send a message with one attachment:**
```
chatops_send_message_with_files channelId="ch_general" message="Q1 report attached" fileIds=["file_xyz789"]
```

**Reply with file:**
```
chatops_send_message_with_files channelId="ch_general" message="Updated version attached" fileIds=["file_aaa"] rootPostId="post_root123"
```
