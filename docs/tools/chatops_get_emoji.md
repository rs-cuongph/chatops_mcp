# chatops_get_emoji

## When to Use

Look up custom emoji available in the ChatOps workspace. Use this before `chatops_add_reaction` when you need to find the correct emoji slug. Can look up by ID, by name, or list all custom emoji.

Built-in system emoji (`:thumbsup:`, `:heart:`, etc.) are **not** returned — use their standard names directly with `chatops_add_reaction`.

## Input

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `emojiId` | string | No | — | Custom emoji ID (preferred lookup) |
| `emojiName` | string | No | — | Emoji slug without colons — used when `emojiId` is not provided |

Omit both to list all custom emoji.

## Output

```
## Custom Emoji (3)

| Preview | Name (slug) | ID |
|---------|------------|-----|
| :wave: | `wave` | `emoji_aaa` |
| :rocket: | `rocket` | `emoji_bbb` |
| :fire: | `fire` | `emoji_ccc` |

---
💡 Use emoji names with `chatops_add_reaction` (e.g. emojiName: "wave"), or include :emojiname: syntax in `chatops_send_message`.
```

## Error Cases

| Condition | Message |
|-----------|---------|
| Emoji not found | `Failed to get emoji: ChatOps HTTP 404` |
| Invalid token | `ChatOps returned 401/403 — check that CHATOPS_TOKEN is valid.` |

## Examples

**List all custom emoji:**
```
chatops_get_emoji
```

**Look up by name:**
```
chatops_get_emoji emojiName="wave"
```
