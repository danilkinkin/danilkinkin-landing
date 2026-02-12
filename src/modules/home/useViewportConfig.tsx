import { useMainView } from "@stores/mainView.ts";
import { useEffect, useRef } from "react";

export const VIEWPORT_GAP = 40;

export function useViewportLargeConfig() {
	const hostRef = useRef<HTMLElement>(null);
	const viewBlockRef = useRef<HTMLDivElement>(null);
	const textBlockRef = useRef<HTMLDivElement>(null);

	const setViewports = useMainView((store) => store.setViewports);

	useEffect(() => {
		const handleResize = () => {
			const host = hostRef.current;
			const viewBlock = viewBlockRef.current;
			const textBlock = textBlockRef.current;

			if (!(host && viewBlock && textBlock)) return;

			const hostRect = host.getBoundingClientRect();
			const viewBlockRect = viewBlock.getBoundingClientRect();
			const textBlockRect = textBlock.getBoundingClientRect();

			let shift = viewBlockRect.width - textBlockRect.width;
			const y = hostRect.height - viewBlockRect.bottom;

			console.log("viewBlockRect:", viewBlockRect);

			const forestViewport = {
				x: viewBlockRect.left,
				y,
				w: shift,
				h: viewBlockRect.height,
			};

			shift += viewBlockRect.left + VIEWPORT_GAP;

			const middleWidth =
				(textBlockRect.width - VIEWPORT_GAP - VIEWPORT_GAP) * 0.77;

			const houseViewport = {
				x: shift,
				y,
				w: middleWidth,
				h: viewBlockRect.height - textBlockRect.height,
			};

			shift += middleWidth + VIEWPORT_GAP;

			const chemneyViewport = {
				x: shift,
				y,
				w: textBlockRect.width - middleWidth - VIEWPORT_GAP - VIEWPORT_GAP,
				h: viewBlockRect.height - textBlockRect.height,
			};

			console.log(
				"Resized viewports:",
				forestViewport,
				houseViewport,
				chemneyViewport,
			);

			setViewports(forestViewport, houseViewport, chemneyViewport);
		};

		addEventListener("resize", handleResize);

		handleResize();

		return () => {
			removeEventListener("resize", handleResize);
		};
	}, [setViewports]);

	return {
		hostRef,
		viewBlockRef,
		textBlockRef,
	};
}

export function useViewportNarrowConfig() {
	const hostRef = useRef<HTMLElement>(null);
	const viewBlockRef = useRef<HTMLDivElement>(null);
	const textBlockRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);

	const setViewports = useMainView((store) => store.setViewports);

	useEffect(() => {
		const handleResize = () => {
			const host = hostRef.current;
			const viewBlock = viewBlockRef.current;
			const textBlock = textBlockRef.current;
			const footer = footerRef.current;

			if (!(host && viewBlock && textBlock && footer)) return;

			const hostRect = host.getBoundingClientRect();
			const viewBlockRect = viewBlock.getBoundingClientRect();
			const textBlockRect = textBlock.getBoundingClientRect();
			const footerRect = footer.getBoundingClientRect();

			let shift = viewBlockRect.width - textBlockRect.width;
			const y = hostRect.height - viewBlockRect.bottom;

			console.log("viewBlockRect:", viewBlockRect);

			const forestViewport = {
				x: footerRect.left,
				y: hostRect.height - footerRect.bottom,
				w: footerRect.width,
				h: footerRect.height,
			};

			shift += viewBlockRect.left + VIEWPORT_GAP;

			const middleWidth =
				(textBlockRect.width - VIEWPORT_GAP - VIEWPORT_GAP) * 0.77;

			const houseViewport = {
				x: viewBlockRect.left,
				y: hostRect.height - textBlockRect.height - viewBlockRect.top,
				w: viewBlockRect.width - 130 - 14,
				h: 110,
			};

			shift += middleWidth + VIEWPORT_GAP;

			const chemneyViewport = {
				x: viewBlockRect.width - 130 + viewBlockRect.left,
				y: hostRect.height - textBlockRect.height - viewBlockRect.top,
				w: 130,
				h: textBlockRect.height,
			};

			console.log(
				"Resized viewports:",
				forestViewport,
				houseViewport,
				chemneyViewport,
			);

			setViewports(forestViewport, houseViewport, chemneyViewport);
		};

		addEventListener("resize", handleResize);

		handleResize();

		return () => {
			removeEventListener("resize", handleResize);
		};
	}, [setViewports]);

	return {
		hostRef,
		viewBlockRef,
		textBlockRef,
		footerRef,
	};
}
