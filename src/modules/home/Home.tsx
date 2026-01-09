import { Navigation } from "@components/navigation/Navigation.tsx";
import { Canvas } from "@react-three/fiber";
import { useMainView } from "@stores/mainView.ts";
import { useWind } from "@stores/windStore.ts";
import {
	useEffect, // @ts-types="react"
	useRef,
} from "react";
import { NoToneMapping } from "three";
import { ForestSceneMultiView } from "../forest/ForestScene.tsx";

import styles from "./Home.module.css";

export function Home() {
	const hostRef = useRef<HTMLElement>(null);
	const viewBlockRef = useRef<HTMLDivElement>(null);
	const textBlockRef = useRef<HTMLDivElement>(null);

	const setViewports = useMainView((store) => store.setViewports);
	const setWindForce = useWind((s) => s.setStrength);

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
			const y = hostRect.height - viewBlockRect.height - viewBlockRect.top;

			console.log("viewBlockRect:", viewBlockRect);

			const forestViewport = {
				x: viewBlockRect.left,
				y,
				w: shift,
				h: viewBlockRect.height,
			};

			shift += viewBlockRect.left + 40;

			const middleWidth = (textBlockRect.width - 40 - 40) * 0.77;

			const houseViewport = {
				x: shift,
				y,
				w: middleWidth,
				h: viewBlockRect.height - textBlockRect.height,
			};

			shift += middleWidth + 40;

			const chemneyViewport = {
				x: shift,
				y,
				w: textBlockRect.width - middleWidth - 40 - 40,
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

	useEffect(() => {
		const keydownHandler = (e: KeyboardEvent) => {
			if (e.key === " ") {
				e.preventDefault();
				e.stopPropagation();

				setWindForce(10);
			}
		};
		const keyupHandler = (e: KeyboardEvent) => {
			if (e.key === " ") {
				e.preventDefault();
				e.stopPropagation();

				setWindForce(0);
			}
		};

		addEventListener("keydown", keydownHandler);
		addEventListener("keyup", keyupHandler);

		return () => {
			removeEventListener("keydown", keydownHandler);
			removeEventListener("keyup", keyupHandler);
		};
	}, [setWindForce]);

	return (
		<section className={styles.host} id="home" ref={hostRef}>
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
			<div className={styles.footerSection}>
				<Navigation current="home" />
			</div>
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
