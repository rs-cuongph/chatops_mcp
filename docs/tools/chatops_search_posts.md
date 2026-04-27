# chatops_search_posts

## When to Use

Full-text search for posts across a ChatOps team. Supports Mattermost-style search operators for precise filtering. Use this when you need to find specific messages by content, author, channel, or date.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamId` | string | ✅ | — | ChatOps team ID to search within |
| `terms` | string | ✅ | — | Search query (supports search syntax below) |
| `channelName` | string | No | — | Channel slug to restrict search (e.g. `town-square`) |
| `isOrSearch` | boolean | No | `false` | If `true`, terms are OR-ed instead of AND-ed |
| `page` | integer | No | `0` | 0-based page number |
| `perPage` | integer | No | `20` | Results per page (max 60) |

### Search Syntax

| Syntax | Example | Description |
|--------|---------|-------------|
| Plain text | `deploy production` | AND search across all fields |
| Phrase | `"deploy complete"` | Exact phrase match |
| `in:channel` | `in:town-square alert` | Restrict to channel |
| `from:user` | `from:john deploy` | Posts by specific user |
| `on:date` | `on:2024-04-26` | Posts on exact date |
| `before:date` | `before:2024-04-26` | Posts before date |
| `after:date` | `after:2024-04-01` | Posts after date |

## Output

```
## Search Results: "deploy production" (5 posts)

1. **Post** `post_aaa`
   - Channel : `ch_general`
   - Author  : @john.doe
   - Created : 2024-04-26 14:30
   - Message : Deployment to production started. ETA 15 minutes…

2. **Post** `post_bbb`
   - Channel : `ch_devops`
   - Author  : @jane.smith
   - Created : 2024-04-26 15:00
   - Message : Production deploy complete ✅

---
💡 Use `chatops_get_thread` with a post ID to see the full conversation.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Empty results | `No posts found matching "<terms>".` |
| Invalid team | `Failed to search posts: ChatOps HTTP 403/404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Search for posts mentioning "deploy":**
```
chatops_search_posts teamId="team_abc" terms="deploy"
```

**Search in a specific channel:**
```
chatops_search_posts teamId="team_abc" terms="alert" channelName="monitoring"
```

**Search posts by a specific user:**
```
chatops_search_posts teamId="team_abc" terms="from:john deploy"
```

**Search a date range:**
```
chatops_search_posts teamId="team_abc" terms="after:2024-04-01 before:2024-04-26 incident"
```
