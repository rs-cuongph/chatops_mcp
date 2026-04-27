// ---------------------------------------------------------------------------
// Bootstrap — load .env and resolve paths relative to project root.
// Automatically triggered via config.ts import chain.
//
// Strategy:
//   Local dev (tsx src/server.ts):  session stored in <project>/.chatops/
//   Published npm (npx pkg):        session stored in ~/.chatops/
// ---------------------------------------------------------------------------
import { resolve, dirname, join } from "path";
import { homedir } from "os";
import { fileURLToPath } from "url";
import { config as loadDotenv } from "dotenv";

// Resolve project root: walk up from this file (src/bootstrap.ts → project root)
// Works with both tsx (ESM) and compiled JS (CJS).
const thisFile =
  typeof __filename !== "undefined"
    ? __filename
    : fileURLToPath(import.meta.url);

export const projectRoot = dirname(dirname(thisFile));

export const fromRoot = (p: string): string => resolve(projectRoot, p);

// Detect whether we're running from an npm install (inside node_modules)
// or from a local dev checkout.
const isNpmInstall = projectRoot.includes("node_modules");

// Load .env only in local dev (npm installs don't ship with .env)
if (!isNpmInstall) {
  loadDotenv({ path: fromRoot(".env") });
}

// Resolve default paths:
//   - local dev  → <project>/.chatops/session.json
//   - npm install → ~/.chatops/<package-name>/session.json
export const defaultSessionDir = isNpmInstall
  ? join(homedir(), ".chatops", "chatops-mcp")
  : fromRoot(".chatops");
