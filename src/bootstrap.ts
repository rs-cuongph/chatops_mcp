// ---------------------------------------------------------------------------
// Bootstrap — load .env and resolve paths relative to project root.
// Automatically triggered via config.ts import chain.
// ---------------------------------------------------------------------------
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { config as loadDotenv } from "dotenv";

// Resolve project root: walk up from this file (src/bootstrap.ts → project root)
// Works with both tsx (ESM) and compiled JS.
const thisFile =
  typeof __filename !== "undefined"
    ? __filename // CJS / compiled
    : fileURLToPath(import.meta.url); // ESM / tsx

export const projectRoot = dirname(dirname(thisFile));

export const fromRoot = (p: string): string => resolve(projectRoot, p);

loadDotenv({ path: fromRoot(".env") });

// Always resolve session file to an absolute path — not configurable via env.
process.env.CHATOPS_SESSION_FILE = fromRoot(".chatops/session.json");
