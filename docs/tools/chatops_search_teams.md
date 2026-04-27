# chatops_search_teams

## When to Use

Search for ChatOps teams by name or display name. Use when you know a team's approximate name but not its ID.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `term` | string | ✅ | — | Search term to match against team name/display name |

## Output

```
## ChatOps Teams matching "eng" (1)

1. **Engineering** (`engineering`)
   - ID: `abc123xyz`
   - Type: open
   - Description: Engineering team workspace

---
💡 Use `chatops_list_channels` with a team ID to browse channels, or `chatops_search_posts` to find specific messages.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| No results | `No teams found matching "<term>".` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Search for teams:**
```
chatops_search_teams term="engineering"
```
