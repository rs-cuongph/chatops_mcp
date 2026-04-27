# chatops_add_reaction

## When to Use

Add an emoji reaction to a specific ChatOps post. Requires the emoji name (slug without colons) and the target post ID. Use `chatops_get_emoji` first to find available custom emoji slugs.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `postId` | string | ✅ | — | ID of the post to react to |
| `emojiName` | string | ✅ | — | Emoji slug without colons (e.g. `thumbsup`, `wave`) |

## Output

```
## ✅ Reaction added

- **Emoji**: :thumbsup:
- **Post ID**: `post_abc123`
- **User ID**: `user_xyz789`
- **Reacted at**: 2024-04-26 15:30:00

---
💡 Use `chatops_get_reactions` to see all reactions on this post, or `chatops_get_thread` to view the full conversation.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Invalid post ID | `Failed to add reaction: ChatOps HTTP 404` |
| Invalid emoji | `Failed to add reaction: ChatOps HTTP 400` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**Add a thumbs up:**
```
chatops_add_reaction postId="post_abc123" emojiName="thumbsup"
```

**Add a wave:**
```
chatops_add_reaction postId="post_abc123" emojiName="wave"
```
