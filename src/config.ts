import { fromRoot } from "./bootstrap.js"; // loads .env + provides path resolver
import { z } from "zod";
import { configError } from "./errors.js";

// ---------------------------------------------------------------------------
// Schema — only user-facing variables are read from the environment.
// Internal/infra settings are hardcoded below.
// ---------------------------------------------------------------------------

const schema = z.object({
  CHATOPS_URL: z
    .string()
    .url("CHATOPS_URL must be a valid URL (e.g. https://chatops.yourcompany.com)"),

  LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error"])
    .default("info"),
});

// ---------------------------------------------------------------------------
// Hardcoded defaults — not configurable via .env
// ---------------------------------------------------------------------------

const DEFAULTS = {
  CHATOPS_SESSION_FILE: fromRoot(".chatops/session.json"), // absolute path
  CHATOPS_VALIDATE_PATH: "/api/v4/users/me",
  PLAYWRIGHT_HEADLESS: false,
  PLAYWRIGHT_BROWSER: "chromium" as const,
} as const;

export type Config = z.infer<typeof schema> & typeof DEFAULTS;

// ---------------------------------------------------------------------------
// Parse once at startup — callers import `config` directly
// ---------------------------------------------------------------------------

function loadConfig(): Config {
  const result = schema.safeParse(process.env);
  if (!result.success) {
    const messages = result.error.errors
      .map((e) => `  ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    throw configError(`Invalid configuration:\n${messages}`, result.error);
  }
  return { ...DEFAULTS, ...result.data };
}

export const config: Config = loadConfig();
