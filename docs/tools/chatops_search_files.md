# chatops_search_files

## When to Use

Search for file attachments within a ChatOps team by file name or extension. Returns file metadata including size, type, and the post/channel each file was attached to. Optionally filter by channel ID.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamId` | string | ✅ | — | ChatOps team ID to search within |
| `terms` | string | ✅ | — | Search term matched against file name |
| `channelId` | string | No | — | Channel ID to restrict search to a specific channel |
| `page` | integer | No | `0` | 0-based page number |
| `perPage` | integer | No | `20` | Results per page (max 60) |

## Output

```
## File Search Results: "report.pdf" (2 files)

1. **report.pdf**
   - ID      : `file_aaa`
   - Size    : 245.3 KB
   - Type    : application/pdf
   - Post    : `post_bbb`
   - Channel : `ch_general`
   - Uploaded: 2024-04-26 10:00

2. **q1_report.pdf**
   - ID      : `file_ccc`
   - Size    : 1.2 MB
   - Type    : application/pdf
   - Post    : `post_ddd`
   - Channel : `ch_finance`
   - Uploaded: 2024-04-20 09:15

---
💡 Use `chatops_get_file_info` with a file ID for full metadata, or `chatops_get_post` with the post ID to see the message context.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| No results | `No files found matching "<terms>".` |
| Invalid team | `Failed to search files: ChatOps HTTP 403/404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Search for PDF files:**
```
chatops_search_files teamId="team_abc" terms=".pdf"
```

**Search in a specific channel:**
```
chatops_search_files teamId="team_abc" terms="screenshot" channelId="ch_general"
```
