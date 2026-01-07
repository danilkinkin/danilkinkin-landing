import { Canvas } from "@react-three/fiber";
import { WindControls } from "@utils/fiber/WindControls.tsx";
import { NoToneMapping } from "three";
import { ForestScene } from "../forest/ForestScene.tsx";

import styles from "./Sandbox.module.css";

export function Sandbox() {
	return (
		<div className={styles.host}>
			<Canvas dpr={[1, 2]} gl={{ toneMapping: NoToneMapping }} shadows={false}>
				<ForestScene />
			</Canvas>
			<WindControls />
		</div>
	);
}
