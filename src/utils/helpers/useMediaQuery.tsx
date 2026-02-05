import { useEffect, useState } from "react";

export function useMediaQuery(query: string, defaultValue = false) {
	const [matches, setMatches] = useState(defaultValue);

	useEffect(() => {
		// SSR guard
		if (
			typeof window === "undefined" ||
			typeof window.matchMedia !== "function"
		) {
			return;
		}

		const mql = window.matchMedia(query);
		const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
			setMatches("matches" in e ? e.matches : (e as MediaQueryList).matches);
		};

		// Initial value
		setMatches(mql.matches);

		// Subscribe
		if (typeof mql.addEventListener === "function") {
			mql.addEventListener("change", onChange as EventListener);
			return () => mql.removeEventListener("change", onChange as EventListener);
		}
		// Safari < 14
		mql.addListener(
			onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => any,
		);
		return () =>
			mql.removeListener(
				onChange as (this: MediaQueryList, ev: MediaQueryListEvent) => any,
			);
	}, [query]);

	return matches;
}
