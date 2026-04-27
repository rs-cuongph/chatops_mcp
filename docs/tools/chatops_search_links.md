# chatops_search_links

## When to Use

Find posts that contain shared URLs or links within a ChatOps team. Optionally narrow by domain keyword (e.g. `github.com`, `jira`) or restrict to a specific channel. Useful for discovering shared resources, references, and external links in conversations.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamId` | string | ✅ | — | ChatOps team ID to search within |
| `channelName` | string | No | — | Channel slug to restrict search (e.g. `town-square`) |
| `term` | string | No | — | Keyword to narrow results (e.g. `github.com`, `confluence`) |
| `page` | integer | No | `0` | 0-based page number |
| `perPage` | integer | No | `20` | Results per page (max 60) |

## Output

```
## Posts with Links (3 found)

1. **Post** `post_aaa` — 2024-04-26 14:30
   - Channel : `ch_general`
   - Author  : @john.doe
   - 🔗 https://github.com/org/repo/pull/123
   - 🔗 https://jira.company.com/browse/PROJ-456

2. **Post** `post_bbb` — 2024-04-25 10:00
   - Channel : `ch_devops`
   - Author  : @jane.smith
   - 🔗 https://github.com/org/repo/issues/789

---
💡 Use `chatops_get_post` with a post ID to see the full message context.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| No results | `No posts with links found.` |
| Invalid team | `Failed to search links: ChatOps HTTP 403/404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Find all posts with links:**
```
chatops_search_links teamId="team_abc"
```

**Find GitHub links only:**
```
chatops_search_links teamId="team_abc" term="github.com"
```

**Find Jira links in a specific channel:**
```
chatops_search_links teamId="team_abc" channelName="devops" term="jira"
```
