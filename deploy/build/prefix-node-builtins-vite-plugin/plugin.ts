import { builtinModules } from "node:module";
import type { Plugin } from "vite";

/**
 * This plugin prefixes all Node.js built-in modules with 'node:'.
 * Because deno requires it.
 * For example, 'fs' will become 'node:fs'.
 */
const prefixNodeBuiltinsPlugin = (): Plugin => {
  const builtins = new Set(builtinModules);

  return {
    name: "prefix-node-builtins",
    renderChunk(code) {
      const importRegex = new RegExp(
        `(?<=import.*?['"])(${[...builtins].join("|")})(/[^'"]*)?(?=['"])`,
        "g",
      );

      const modifiedCode = code.replace(importRegex, (match) => {
        // Avoid double prefixing if 'node:' is already present
        if (match.startsWith("node:")) {
          return match;
        }
        return `node:${match}`;
      });

      return {
        code: modifiedCode,
        map: null,
      };
    },
  };
};

// biome-ignore lint/style/noDefaultExport: Common solution for Vite plugins
export default prefixNodeBuiltinsPlugin;
