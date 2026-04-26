import type { Config } from "../config.js";
import { createClient, errorContent } from "../utils.js";
import { isMcpError } from "../errors.js";
import type { ChatOpsPost } from "../types.js";

export interface SearchPostsInput {
  teamId: string;
  terms: string;
  isOrSearch?: boolean;
  page?: number;
  perPage?: number;
}

function formatPost(p: ChatOpsPost, index: number): string {
  const lines = [
    `${index + 1}. **Post** \`${p.id}\``,
    `   - Channel : \`${p.channelId}\``,
    `   - Author  : \`${p.userId}\``,
    `   - Created : ${p.createdAt}`,
    `   - Message : ${p.message.slice(0, 300)}${p.message.length > 300 ? "…" : ""}`,
  ];
  if (p.fileIds.length > 0) lines.push(`   - Files   : ${p.fileIds.join(", ")}`);
  return lines.join("\n");
}

export async function handleSearchPosts(
  input: SearchPostsInput,
  cfg: Config
): Promise<{ content: Array<{ type: "text"; text: string }>; isError?: boolean }> {
  const client = await createClient(cfg);
  try {
    const result = await client.searchPosts(input.teamId, input.terms, {
      isOrSearch: input.isOrSearch ?? false,
      page: input.page ?? 0,
      perPage: input.perPage ?? 20,
    });

    if (result.posts.length === 0) {
      return {
        content: [{ type: "text", text: `No posts found matching "${input.terms}".` }],
      };
    }

    const lines = [
      `## Search Results: "${input.terms}" (${result.total} posts)`,
      "",
      ...result.posts.map(formatPost),
    ];

    return { content: [{ type: "text", text: lines.join("\n") }] };
  } catch (err) {
    const msg = isMcpError(err) ? err.message : String(err);
    return errorContent(`Failed to search posts: ${msg}`);
  }
}
