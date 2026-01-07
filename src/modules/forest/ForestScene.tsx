import { CameraControls, OrthographicCamera } from "@react-three/drei";
import { Model as Rock } from "./Rock.tsx";
import { Model as Tree1 } from "./Tree1.tsx";
import { Model as Tree2 } from "./Tree2.tsx";
import { Model as Tree3 } from "./Tree3.tsx";
import { Model as Tree4 } from "./Tree4.tsx";
import { Model as Tree5 } from "./Tree5.tsx";
import { Model as Tree6 } from "./Tree6.tsx";

export function ForestScene() {
	return (
		<>
			<OrthographicCamera
				makeDefault
				position={[0, 0, 10]}
				zoom={200}

				//ref={cameraRef}
			/>
			<CameraControls enabled />
			<axesHelper args={[1]} position={[0, 0, 0]} />
			{/*<color attach="background" args={[bgColor.r, bgColor.g, bgColor.b]} />*/}
			<Tree6 position={[17, 0, 0]} />
			<Tree5 position={[14, 0, 0]} />
			<Tree4 position={[11, 0, 0]} />
			<Tree3 position={[7, 0, 0]} />
			<Tree2 position={[3, 0, 0]} />
			<Tree1 position={[0, 0, 0]} />
			<Rock position={[0, -1, 0]} variant="2" />
		</>
	);
}
