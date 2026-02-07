import { loadFonts } from "@services/theme/fontLoader.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { App } from "./App.tsx";

const SKIP_LOADER = false;

const waitAnimationPromise = new Promise<void>((resolve) => {
	if (SKIP_LOADER) {
		return resolve();
	}

	// Added delay for show static logo little longer
	const WAIT_DURATION = 1200;

	// Wait for animation to finish entering, for switch in static stage and prevent flickering
	const waitHydrate = 500 + WAIT_DURATION - performance.now();

	setTimeout(resolve, waitHydrate);
});

Promise.all([loadFonts() /*   waitAnimationPromise*/]).then(hydrate);

function hydrate() {
	// Drop last slash from base URL. Router accept only path without slash at the end.
	const routerBase = import.meta.env.BASE_URL.slice(0, -1);

	ReactDOM.hydrateRoot(
		document.getElementById("root") as HTMLElement,
		<React.StrictMode>
			<Router base={routerBase} hook={useBrowserLocation}>
				<App />
			</Router>
		</React.StrictMode>,
		{
			onRecoverableError(error, errorInfo) {
				console.error("onRecoverableError:", error, errorInfo);
			},
			onCaughtError(error, errorInfo) {
				console.error("onCaughtError:", error, errorInfo);
			},
			onUncaughtError(error, errorInfo) {
				console.error("onUncaughtError:", error, errorInfo);
			},
		},
	);
}
