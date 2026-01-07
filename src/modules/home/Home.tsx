import { Navigation } from "@components/navigation/Navigation.tsx";
import { Canvas } from "@react-three/fiber";
import { ForestScene } from "../forest/ForestScene.tsx";

import styles from "./Home.module.css";

export function Home() {
	return (
		<section className={styles.host} id="home">
			<div className={styles.bentoSection}>
				<div className={styles.textBlock}>
					<caption>@danilkinkin</caption>
					<h1>Web developer & not only;</h1>
					<p>
						Work only on ethical, user‑first products. Into code, clean design,
						and crafting stuff that right
					</p>
				</div>
				<div className={styles.canvas}>
					<Canvas dpr={[1, 2]}>
						<ForestScene />
					</Canvas>
				</div>
			</div>
			<div className={styles.footerSection}>
				<Navigation current="home" />
			</div>
		</section>
	);
}
