import { Canvas } from "@react-three/fiber";
import { useMainView } from "@stores/mainView.ts";
import { useEffect, useRef } from "react";
import { NoToneMapping } from "three";
import { ForestSceneMultiView } from "../forest/ForestScene.tsx";
import { Footer } from "./Footer/Footer.tsx";

import styles from "./Home.module.css";

export const VIEWPORT_GAP = 40;

export function Home() {
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

	return (
		<section
			className={styles.host}
			id="home"
			ref={hostRef}
			style={
				{
					"--viewport-gap": `${VIEWPORT_GAP}px`,
				} as React.CSSProperties
			}
		>
			<div className={styles.bentoSection} ref={viewBlockRef}>
				<div className={styles.textBlock} ref={textBlockRef}>
					<caption>@danilkinkin</caption>
					<h1>Web developer & not only;</h1>
					<p>
						Work only on ethical, user‑first products. Into code, clean design,
						and crafting stuff that right
					</p>
				</div>
			</div>
			<Footer />
			<div className={styles.canvas}>
				<Canvas
					dpr={[1, 2]}
					gl={{ toneMapping: NoToneMapping }}
					shadows={false}
				>
					<ForestSceneMultiView />
				</Canvas>
			</div>
		</section>
	);
}
