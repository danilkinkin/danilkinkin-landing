import { CameraControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { WindControls } from "@utils/fiber/WindControls.tsx";
import { NoToneMapping } from "three";
import { ForestScene } from "../forest/ForestScene.tsx";

import styles from "./Sandbox.module.css";

export function Sandbox() {
	return (
		<div className={styles.host}>
			<Canvas dpr={[1, 2]} gl={{ toneMapping: NoToneMapping }} shadows={false}>
				<OrthographicCamera
					makeDefault
					position={[0, 0, 10]}
					zoom={200}

					//ref={cameraRef}
				/>
				<CameraControls enabled />
				<ForestScene />
			</Canvas>
			<WindControls />
		</div>
	);
}
