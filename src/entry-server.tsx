import { SSRHead } from "@modules/ssr-head/SSRHead.tsx";
import {
	getCollectedCriticalCSS,
	resetCriticalCSSCollector,
	useCollectCritilcalCSS,
} from "@services/theme/criticalCssCollector.tsx";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Router } from "wouter";
import { App } from "./App.tsx";

import baselineStyles from "/src/services/theme/baseline.css?inline";

export type Render = {
	body: string;
	head?: string;
	lang?: string;
	theme?: string;
	size?: string;
};

export async function render(
	path: string,
	ssrManifest: Record<string, string[]> | undefined,
	stats: Array<[string, number]>,
): Promise<Render> {
	stats.push(["Preload data", performance.now()]);

	resetCriticalCSSCollector();

	const body = ReactDOMServer.renderToString(
		<React.StrictMode>
			<Router base={`${import.meta.env.BASE_URL}`} ssrPath={path}>
				<App />
			</Router>
		</React.StrictMode>,
	);

	stats.push(["Body render", performance.now()]);

	useCollectCritilcalCSS(baselineStyles);

	const js = [];
	const css = [];

	// Experimental preload chunks
	if (ssrManifest) {
		const preloadChunk: string[] = [];

		for (const path of preloadChunk) {
			if (path.endsWith(".js")) {
				js.push(path);
			} else if (path.endsWith(".css")) {
				css.push(path);
			}
		}
	}

	const head = ReactDOMServer.renderToString(
		<React.StrictMode>
			<SSRHead criticalCSS={getCollectedCriticalCSS()} />
		</React.StrictMode>,
	);

	stats.push(["Head render", performance.now()]);

	return { body, head };
}
