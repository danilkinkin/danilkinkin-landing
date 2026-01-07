import { CameraControls, OrthographicCamera } from "@react-three/drei";
import { Model as Tree6 } from "./Tree6.tsx";

export function ForestScene() {
	return (
		<>
			<OrthographicCamera
				makeDefault
				position={[0, 0, 10]}
				zoom={600}
				//ref={cameraRef}
			/>
			<CameraControls enabled />
			<axesHelper args={[1]} position={[0, 0, 0]} />
			{/*<color attach="background" args={[bgColor.r, bgColor.g, bgColor.b]} />*/}
			<Tree6 />
		</>
	);
}
