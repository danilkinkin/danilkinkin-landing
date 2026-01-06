import { debounce } from "@utils/helpers/debounce.ts";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "wouter";

export function useScrollToPosition() {
	const [location] = useLocation();
	const isRestored = useRef(false);

	useLayoutEffect(() => {
		if (history.state?.noScrollTo) return;

		const section = location.slice(1) || "home";

		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}

		const target = document.getElementById(section);
		if (target) {
			if (isRestored.current) {
				target.scrollIntoView({
					block: "start",
					inline: "nearest",
					behavior: "smooth",
				});
			} else {
				target.scrollIntoView({
					block: "start",
					inline: "nearest",
					behavior: "instant",
				});
			}
		}

		isRestored.current = true;
	}, [location]);
}

function useDetectCurrentSection() {
	const [_, navigate] = useLocation();

	useEffect(() => {
		const sections = ["home", "about", "contacts"].map((r) =>
			document.getElementById(r),
		) as HTMLElement[];

		const listener = debounce(
			() => {
				const center = window.innerHeight / 2;
				const current = sections.find((s) => {
					const r = s.getBoundingClientRect();
					return r.top <= center && r.bottom >= center;
				});

				if (!current) return;

				let path = "/";

				if (current.id !== "home") {
					path += current.id;
				}

				navigate(path, {
					replace: true,
					state: {
						noScrollTo: true,
					},
				});
			},
			200,
			true,
		);

		addEventListener("scroll", listener, { passive: true });

		return () => removeEventListener("scroll", listener);
	}, [navigate]);
}

export function useAppRoutingSync() {
	useScrollToPosition();
	useDetectCurrentSection();
}
