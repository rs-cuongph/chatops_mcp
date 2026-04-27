# chatops_get_reactions

## When to Use

Get all emoji reactions on a specific ChatOps post. Returns a grouped summary (emoji → count) and a detail table (emoji, user, timestamp). Useful to understand team sentiment or verify a reaction was added.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `postId` | string | ✅ | — | ID of the post to get reactions for |

## Output

```
## Reactions on post `post_abc123`

**Total**: 3 reaction(s) across 2 emoji(s)

### Summary
- :thumbsup: × 2
- :wave: × 1

### Detail
| Emoji | User ID | Reacted at |
|-------|---------|------------|
| thumbsup | `user_aaa` | 2024-04-26 10:00 |
| thumbsup | `user_bbb` | 2024-04-26 10:05 |
| wave | `user_ccc` | 2024-04-26 10:10 |

---
💡 Use `chatops_add_reaction` to add a reaction, or `chatops_get_post` to see the full post context.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid post ID | `Failed to get reactions: ChatOps HTTP 404` |
| No reactions | Returns empty summary |

## Examples

**Get all reactions on a post:**
```
chatops_get_reactions postId="post_abc123"
```
