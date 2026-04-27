# chatops_get_file_info

## When to Use

Get detailed metadata for a specific file attachment using its file ID. Returns name, size, MIME type, upload timestamp, and the post/channel it was attached to. Useful when you have a `fileId` from a post or search result and need more details.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fileId` | string | ✅ | — | ChatOps file ID to look up |

## Output

```
## File: quarterly_report.pdf

- **ID**        : `file_abc123`
- **Extension** : pdf
- **Size**      : 1.2 MB
- **MIME type** : application/pdf
- **Post ID**   : `post_xyz789`
- **Channel**   : `ch_finance`
- **Uploaded**  : 2024-04-26 09:00

---
💡 Use `chatops_get_post` with postId `post_xyz789` to see the message this file was attached to.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid file ID | `Failed to get file info for "<id>": ChatOps HTTP 404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Get file metadata:**
```
chatops_get_file_info fileId="file_abc123"
```
