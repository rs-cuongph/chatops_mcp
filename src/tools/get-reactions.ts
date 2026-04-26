import type { Config } from "../config.js";
import { ChatOpsHttpClient } from "../chatops/http-client.js";
import { isMcpError } from "../errors.js";
import { errorContent } from "../utils.js";

export interface GetReactionsInput {
  postId: string;
}

export async function handleGetReactions(
  input: GetReactionsInput,
  cfg: Config
): Promise<{ content: Array<{ type: "text"; text: string }>; isError?: boolean }> {
  const client = new ChatOpsHttpClient(cfg.CHATOPS_URL, cfg.CHATOPS_TOKEN);
  try {
    const reactions = await client.getPostReactions(input.postId);

    if (reactions.length === 0) {
      return {
        content: [{ type: "text", text: `## Reactions on post \`${input.postId}\`\n\nNo reactions yet.` }],
      };
    }

    // Group by emoji for a summary view
    const grouped = new Map<string, string[]>();
    for (const r of reactions) {
      if (!grouped.has(r.emojiName)) grouped.set(r.emojiName, []);
      grouped.get(r.emojiName)!.push(r.userId);
    }

    const summaryLines = Array.from(grouped.entries())
      .sort((a, b) => b[1].length - a[1].length)
      .map(([emoji, users]) => `- :${emoji}: **${users.length}** (${users.join(", ")})`);

    const detailLines = reactions.map(
      (r) => `| :${r.emojiName}: | \`${r.userId}\` | ${r.createdAt} |`
    );

    const lines = [
      `## Reactions on post \`${input.postId}\``,
      "",
      `**Total**: ${reactions.length} reaction(s) across ${grouped.size} emoji(s)`,
      "",
      "### Summary",
      ...summaryLines,
      "",
      "### Detail",
      "| Emoji | User ID | Reacted at |",
      "|-------|---------|------------|",
      ...detailLines,
    ];

    return { content: [{ type: "text", text: lines.join("\n") }] };
  } catch (err) {
    const msg = isMcpError(err) ? err.message : String(err);
    return errorContent(`Failed to get reactions: ${msg}`);
  }
}
