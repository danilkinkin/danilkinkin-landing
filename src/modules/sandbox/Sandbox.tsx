import { CameraControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { WindControls } from "@utils/fiber/WindControls.tsx";
import { useEffect } from "react";
import { NoToneMapping } from "three";
import { ForestScene } from "../forest/ForestScene.tsx";

import styles from "./Sandbox.module.css";

function WrapperScene() {
	const { camera } = useThree();

	useEffect(() => {
		camera.layers.enableAll();
	}, [camera]);

	return (
		<>
			<OrthographicCamera
				makeDefault
				near={-100}
				position={[0, 0, 10]}
				zoom={200}
			/>
			<CameraControls enabled />
			<ForestScene />
		</>
	);
}

export function Sandbox() {
	return (
		<div className={styles.host}>
			<Canvas dpr={[1, 2]} gl={{ toneMapping: NoToneMapping }} shadows={false}>
				<WrapperScene />
			</Canvas>
			<WindControls />
		</div>
	);
}
