type CriticalCSS = {
	text: string;
};

const collected: Set<CriticalCSS> = new Set();

/**
 * Collect CSS for the server-side rendering. This CSS will be send to client in the first HTML response.
 * @param styles - CSS styles to collect, for example:
 * `import inlineStyles from "import inlineStyles from "./Component.module.css?inline";`
 */
export function useCollectCritilcalCSS(styles: string) {
	if (import.meta.env.SSR) {
		collected.add({
			text: styles,
		});
	}
}

/**
 * Get collected critical CSS styles.
 * @returns CSS string
 */
export function getCollectedCriticalCSS() {
	return Array.from(collected.values())
		.map((css) => css.text)
		.reverse()
		.join("\n");
}

/**
 * Reset collected critical CSS styles.
 */
export function resetCriticalCSSCollector() {
	collected.clear();
}
