# chatops_get_user

## When to Use

Look up a ChatOps user by their ID or username handle. Use this to resolve a raw `userId` from post output into a human-readable name, or to find a user's details before searching for their messages.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `userId` | string | No | — | User ID (preferred lookup) |
| `username` | string | No | — | Username handle without `@` — used when `userId` is not provided |

At least one of `userId` or `username` must be provided.

## Output

```
## @john.doe

- **Display name**: John Doe
- **ID**: `user_abc123`
- **Email**: john.doe@company.com
- **Position**: Senior Engineer
- **Roles**: system_user
- **Joined**: 2023-01-15 08:00

---
💡 Use `chatops_search_posts` with terms `from:john.doe` to find this user's messages.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Neither param provided | `Provide either userId or username.` |
| User not found | `Failed to get user "<lookup>": ChatOps HTTP 404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Look up by user ID:**
```
chatops_get_user userId="user_abc123"
```

**Look up by username:**
```
chatops_get_user username="john.doe"
```
