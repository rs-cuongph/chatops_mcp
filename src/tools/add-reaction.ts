import type { Config } from "../config.js";
import { ChatOpsHttpClient } from "../chatops/http-client.js";
import { isMcpError } from "../errors.js";
import { errorContent } from "../utils.js";

export interface AddReactionInput {
  postId: string;
  emojiName: string;
}

export async function handleAddReaction(
  input: AddReactionInput,
  cfg: Config
): Promise<{ content: Array<{ type: "text"; text: string }>; isError?: boolean }> {
  const client = new ChatOpsHttpClient(cfg.CHATOPS_URL, cfg.CHATOPS_TOKEN);
  try {
    // Resolve the authenticated user's ID first
    const userId = await client.getCurrentUserId();
    const reaction = await client.addReaction(userId, input.postId, input.emojiName);

    const lines = [
      "## ✅ Reaction added",
      "",
      `- **Emoji**: :${reaction.emojiName}:`,
      `- **Post ID**: \`${reaction.postId}\``,
      `- **User ID**: \`${reaction.userId}\``,
      `- **Reacted at**: ${reaction.createdAt}`,
    ];

    return { content: [{ type: "text", text: lines.join("\n") }] };
  } catch (err) {
    const msg = isMcpError(err) ? err.message : String(err);
    return errorContent(`Failed to add reaction: ${msg}`);
  }
}
