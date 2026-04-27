// ---------------------------------------------------------------------------
// Bootstrap — load .env and resolve path env vars relative to project root.
// Import this FIRST in server.ts before any other local imports.
// ---------------------------------------------------------------------------
import { fileURLToPath } from "url";
import { dirname, resolve, isAbsolute } from "path";
import { config as loadDotenv } from "dotenv";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const fromRoot = (p: string): string =>
  isAbsolute(p) ? p : resolve(projectRoot, p);

loadDotenv({ path: fromRoot(".env") });

// Always resolve session file relative to project root — not configurable via env.
process.env.CHATOPS_SESSION_FILE = fromRoot(".chatops/session.json");
