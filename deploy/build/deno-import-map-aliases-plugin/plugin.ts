import fs from "node:fs";
import path from "node:path";
import type { Alias, Plugin, UserConfig } from "vite";

function importMapToViteAliases(
	importMapPath: string,
	projectRoot: string,
): Alias[] {
	const raw = fs.readFileSync(importMapPath, "utf-8");
	const json = JSON.parse(raw);
	const imports: Record<string, string> = json.imports ?? {};

	const exact: Alias[] = [];
	const prefix: Alias[] = [];

	for (const [key, value] of Object.entries(imports)) {
		const abs = path.resolve(projectRoot, value);
		if (key.endsWith("/")) {
			const ns = key.replace(/\/$/, "");
			const replacement = abs.replace(/\/+$/, "") + "/";
			prefix.push({ find: new RegExp(`^${ns}/`), replacement });
		} else {
			exact.push({ find: new RegExp(`^${key}$`), replacement: abs });
		}
	}

	return [...exact, ...prefix];
}

/**
 * Plugin for applying Deno import map aliases to Vite
 */
function denoImportMapAliasPlugin(options?: {
	importMapPath?: string; // path to deno.json
}): Plugin {
	const config: UserConfig | null = null;
	let resolvedImportMapPath = "";
	let projectRoot = "";

	return {
		name: "deno-importmap-alias",
		enforce: "pre",

		config(userConfig, env) {
			projectRoot = userConfig.root ? path.resolve(userConfig.root) : __dirname;
			resolvedImportMapPath = options?.importMapPath
				? path.resolve(projectRoot, options.importMapPath)
				: path.resolve(projectRoot, "deno.json");

			const aliases = importMapToViteAliases(
				resolvedImportMapPath,
				projectRoot,
			);

			// Сливаем с существующими алиасами, наши — первыми (приоритет точных/префиксных)
			const existing = userConfig.resolve?.alias ?? [];
			const existingArr = Array.isArray(existing)
				? existing
				: Object.entries(existing).map(([k, v]) => ({
						find: k,
						replacement: v as string,
					}));
			return {
				resolve: {
					alias: [...aliases, ...existingArr],
				},
			};
		},

		configureServer(server) {
			// Вотчер за deno.json: при изменении — перезапуск оптимизации и alias-ов
			const importer =
				resolvedImportMapPath || path.resolve(projectRoot, "deno.json");
			server.watcher.add(importer);

			server.watcher.on("change", (file) => {
				if (path.resolve(file) === path.resolve(importer)) {
					const aliases = importMapToViteAliases(importer, projectRoot);
					const existing = server.config.resolve.alias ?? [];
					const existingArr = Array.isArray(existing)
						? existing
						: Object.entries(existing).map(([k, v]) => ({
								find: k,
								replacement: v as string,
							}));
					// Обновляем конфиг в рантайме
					server.config.resolve.alias = [...aliases, ...existingArr];

					// Тригерим повторную оптимизацию зависимостей
					console.log(
						"[deno-importmap-alias] deno.json changed -> re-optimizing deps",
					);
					server.restart(); // самый надёжный способ применить новые алиасы в dev
				}
			});
		},
	};
}

// biome-ignore lint/style/noDefaultExport: Common solution for Vite plugins
export default denoImportMapAliasPlugin;
