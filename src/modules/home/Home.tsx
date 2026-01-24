import { Canvas } from "@react-three/fiber";
import { NoToneMapping } from "three";
import { ForestSceneMultiView } from "../forest/ForestScene.tsx";
import { AnimatedMainText } from "./AnimatedMainText/AnimatedMainText.tsx";
import { Footer } from "./Footer/Footer.tsx";
import { useViewportConfig, VIEWPORT_GAP } from "./useViewportConfig.tsx";

import styles from "./Home.module.css";

export function Home() {
	const { hostRef, viewBlockRef, textBlockRef } = useViewportConfig();

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
