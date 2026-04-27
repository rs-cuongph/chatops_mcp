# chatops_list_teams

## When to Use

Use this tool to discover all ChatOps teams the authenticated user is a member of. Typically the **first step** when navigating the ChatOps workspace — get team IDs here, then use them for channel/post queries.

## Input

No parameters required.

## Output

```
## ChatOps Teams (2)

1. **IID** (`iid`)
   - ID: `abc123xyz`
   - Type: open
   - Description: IID-TENTEN-Z.COM

2. **Product** (`product`)
   - ID: `def456uvw`
   - Type: invite-only

---
💡 Use `chatops_list_channels` with a team ID to browse channels, or `chatops_get_team` for full team details.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |
| Network error | `Failed to list teams: <error detail>` |
| No teams | `No teams found.` |

## Examples

**List all joined teams:**
```
chatops_list_teams
```
