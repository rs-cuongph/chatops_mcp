# chatops_upload_file

## When to Use

Upload a local file to ChatOps and get back a `fileId`. The file is not attached to any message yet — pass the returned `fileId` to `chatops_send_message_with_files` to send it.

**Workflow**: `chatops_upload_file` → get `fileId` → `chatops_send_message_with_files`

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `channelId` | string | ✅ | — | Channel where the file will eventually be attached |
| `filePath` | string | ✅ | — | Absolute or relative path to the local file |

## Output

```
## ✅ File uploaded

- **File ID**: `file_abc123`
- **Name**: report.pdf
- **Size**: 245.3 KB
- **MIME type**: application/pdf

---
💡 Use `chatops_send_message_with_files` with fileId `file_abc123` and a channelId to attach this file to a message.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| File not found | `Failed to upload file: ENOENT: no such file or directory` |
| Invalid channel | `Failed to upload file: ChatOps HTTP 403/404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Upload a PDF:**
```
chatops_upload_file channelId="ch_abc123" filePath="/tmp/report.pdf"
```

**Upload a screenshot:**
```
chatops_upload_file channelId="ch_abc123" filePath="./screenshots/error.png"
```
