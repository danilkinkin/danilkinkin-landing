import deno from "@deno/vite-plugin";
import { getServerEnv } from "@utils/helpers/getEnv.ts";
import react from "@vitejs/plugin-react-swc";
import postcssPresetEnv from "postcss-preset-env";
import { visualizer } from "rollup-plugin-visualizer";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import denoImportMapAliasPlugin from "./deploy/build/deno-import-map-aliases-plugin/plugin.ts";
import prefixNodeBuiltins from "./deploy/build/prefix-node-builtins-vite-plugin/plugin.ts";
import packageFile from "./package.json" with { type: "json" };

// https://vitejs.dev/config/
// biome-ignore lint/style/noDefaultExport: Required for Vite
export default defineConfig(({ command, mode }) => {
	const config: UserConfig = {
		root: ".",
		base: getServerEnv("BASE_URL", "/"),
		plugins: [
			deno(),
			denoImportMapAliasPlugin(),
			react(),
			svgr({
				svgrOptions: {
					plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
					svgoConfig: {
						floatPrecision: 2,
						plugins: [
							{
								name: "convertStyleToAttrs",
							},
							{
								name: "prefixIds",
								params: {
									prefixIds: true,
								},
							},
						],
					},
				},
				include: "**/*.svg?react",
			}),
			prefixNodeBuiltins(),
		],
		css: {
			postcss: {
				plugins: [postcssPresetEnv({ stage: 3 })],
			},
		},
		define: {
			"import.meta.env.API_URL": JSON.stringify(getServerEnv("API_URL", "")),
			"import.meta.env.MOCK_API": getServerEnv("MOCK_API", false),
		},
	};

	if (command === "build" && mode.includes("client")) {
		config.build = {
			manifest: true,
			ssrManifest: true,
			outDir: "dist/client",
			rollupOptions: {
				output: {
					manualChunks: (id, _meta) => {
						// Exclude lazy components from core chunk
						if (id.includes("AppFloatedFooter")) {
							return null;
						}

						// Put all shared code into core chunk
						if (id.includes("src/modules/core")) {
							return "core";
						}

						return null;
					},
				},
			},
		};
	}

	if (command === "build" && mode.includes("server")) {
		config.ssr = {
			noExternal: Object.keys(packageFile.dependencies),
		};
		config.publicDir = false;
		config.build = {
			ssr: "server.ts",
			outDir: "dist/server",
			target: "deno2",
			rollupOptions: {
				output: {
					entryFileNames: "index.js",
					inlineDynamicImports: true,
				},
				external: ["fsevents"],
			},
			// For server limit is not critical, so this limit is just for analytics
			chunkSizeWarningLimit: 10 * 1024 * 1024, // 10MB.
		};
	}

	if (mode.includes("analyze")) {
		config.plugins?.push(
			visualizer({
				open: true,
				filename: "dist/client/stats.html",
			}),
		);
	}

	return config;
});
