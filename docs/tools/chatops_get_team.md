# chatops_get_team

## When to Use

Get full details for a specific ChatOps team by its ID. Use after `chatops_list_teams` or `chatops_search_teams` when you need complete team metadata.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `teamId` | string | ✅ | — | ChatOps team ID |

## Output

```
## IID

> IID-TENTEN-Z.COM

- **ID**: `abc123xyz`
- **Name (slug)**: `iid`
- **Type**: open
- **Open invite**: No
- **Created**: 2021-06-30 08:00

---
💡 Use `chatops_list_channels` with this team ID to see all channels, or `chatops_search_posts` to search messages in this team.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid team ID | `Failed to get team "<id>": ChatOps HTTP 404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Get team details:**
```
chatops_get_team teamId="abc123xyz"
```
