import { Navigation } from "@components/navigation/Navigation.tsx";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx/lite";
import { NoToneMapping } from "three";
import { ForestSceneMultiView } from "../forest/ForestScene.tsx";
import { AnimatedMainText } from "./AnimatedMainText/AnimatedMainText.tsx";
import { Footer } from "./Footer/Footer.tsx";
import {
	useViewportConfig,
	useViewportLargeConfig,
	useViewportNarrowConfig,
	VIEWPORT_GAP,
} from "./useViewportConfig.tsx";

import styles from "./Home.module.css";
import { useMediaQuery } from "@utils/helpers/useMediaQuery.tsx";
import { InteractionWithWorld } from "./InteractionWithWorld/InteractionWithWorld.tsx";
import { useWind } from "@stores/windStore.ts";
// @ts-types="react"
import { useEffect } from "react";

function HomeLarge() {
	const { hostRef, viewBlockRef, textBlockRef } = useViewportLargeConfig();

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
					<AnimatedMainText />
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

function HomeNarrow() {
	const { hostRef, viewBlockRef, textBlockRef, footerRef } =
		useViewportNarrowConfig();
	const setWindForce = useWind((s) => s.setStrength);

	useEffect(() => {
	setWindForce(5);

	return () => setWindForce(0);
	}, [setWindForce]);

	return (
		<section
			className={clsx(styles.host, styles.narrow)}
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
				</div>

				<div className={styles.animatedText}>
					<AnimatedMainText compact />
				</div>
			</div>

			<div className={styles.footerNavigation} ref={footerRef}>
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

export function Home() {
  const isNarrowScreen = useMediaQuery(`(max-width: ${870}px)`);

  if (isNarrowScreen) return <HomeNarrow />;

  return <HomeLarge />;

}
