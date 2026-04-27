# chatops_search_users

## When to Use

Search for ChatOps users by name, username, or email. Use when you know a person's name but not their user ID, or to find all users matching a term before filtering posts by author.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `term` | string | ✅ | — | Search term matched against username, full name, or email |
| `page` | integer | No | `0` | 0-based page number |
| `perPage` | integer | No | `20` | Results per page (max 60) |

## Output

```
## User Search: "john" (2 results)

1. **@john.doe** — John Doe (Senior Engineer)
   ID: `user_abc123`

2. **@john.smith** — John Smith
   ID: `user_def456`

---
💡 Use `chatops_get_user` for full details, or `chatops_search_posts` with `from:username` to find their messages.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| No results | `No users found matching "<term>".` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Find users named "john":**
```
chatops_search_users term="john"
```

**Find users by email domain:**
```
chatops_search_users term="@company.com"
```
