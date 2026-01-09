import { CameraControls, View } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMainView } from "@stores/mainView.ts";
import { FlipbookAnimation } from "@utils/fiber/FlipbookAnimation.tsx";
import { folder, useControls } from "leva";
import { useMemo, useRef } from "react";
import { OrthographicCamera, type Scene, Vector3 } from "three";
import { CandleFireFlipbook } from "./CandleFire.tsx";
import { FireFlipbook } from "./Fire.tsx";
import { NoteParticleEmitter2D } from "./NoteParticleEmitter2D.tsx";
import { Model as Rock } from "./Rock.tsx";
import { Model as Tree1 } from "./Tree1.tsx";
import { Model as Tree2 } from "./Tree2.tsx";
import { Model as Tree3 } from "./Tree3.tsx";
import { Model as Tree4 } from "./Tree4.tsx";
import { Model as Tree5 } from "./Tree5.tsx";
import { Model as Tree6 } from "./Tree6.tsx";
import { Model as Vegetation } from "./Vegetation.tsx";
import { Model as World } from "./World.tsx";

export function ForestScene() {
	const ref = useRef(null);

	useControls({
		Item: folder(
			{
				x: {
					value: ref.current ? ref.current.position.x : 0,
					onChange: (v: number) => {
						if (!ref.current) return;
						ref.current.position.x = v;
					},
				},
				y: {
					value: ref.current ? ref.current.position.y : 0,
					onChange: (v: number) => {
						if (!ref.current) return;
						ref.current.position.y = v;
					},
				},
				z: {
					value: ref.current ? ref.current.position.z : 0,
					onChange: (v: number) => {
						if (!ref.current) return;
						ref.current.position.z = v;
					},
				},
			},
			{ collapsed: false },
		),
	});

	return (
		<>
			<World />

			{/* Forest zone */}
			<Tree5 position={[8.46, 0, 1]} />
			<Tree6 position={[10, 3, 0.6]} />
			<Tree2 position={[9.97, -1.73, 4]} />
			<Tree3 position={[11.34, 0.35, 0.8]} />
			<Tree2 position={[8.07, 4.25, 0.55]} />
			<Tree6 position={[10.98, -1.19, 3.5]} />
			<Tree1 position={[7.97, -3.23, 4.5]} />
			<Rock position={[9.63, 3.14, 0.5]} variant="2" />
			<Rock position={[9.1, 2.28, 0.5]} variant="3" />
			<Rock position={[8.43, 4.06, 0.5]} variant="5" />
			<Vegetation kind="mushroom" position={[9.65, 2.94, 0.7]} variant="3" />
			<Vegetation kind="grass" position={[9.43, 3.24, 0.45]} variant="3" />
			<Vegetation kind="grass" position={[9.8, 2.98, 0.65]} variant="2" />
			<Vegetation kind="bush" position={[8.43, 4.14, 0.45]} variant="5" />

			{/* House zone */}
			<FlipbookAnimation
				assetName="fire"
				count={4}
				position={[2.07, 0.14, 1.992]}
				size={[0.169 * 2.1, 0.212 * 2.1]}
			/>
			<CandleFireFlipbook position={[1.25, 1.46, 1.961]} />
			<CandleFireFlipbook position={[1.32, 1.48, 1.96]} shift={1} />
			<CandleFireFlipbook position={[1.28, 1.43, 1.962]} shift={2} />
			<FlipbookAnimation
				assetName="disc"
				count={2}
				intervalMs={320}
				position={[3.29, 0.94, 1.98]}
				size={[84 * 0.0045, 52 * 0.0045]}
			/>
			<FlipbookAnimation
				assetName="noodle"
				count={2}
				intervalMs={340}
				position={[3.37, 0.89, 1.982]}
				size={[66 * 0.0045, 45 * 0.0045]}
			/>
			<NoteParticleEmitter2D position={[3.29, 0.94, 2]} />
			<Tree6 position={[5.07, -0.88, 2.43]} />
			<Tree2 position={[0.99, 1.46, 0.45]} />
			<Tree5 position={[3.51, 1.08, 0.34]} />
			<Tree4 position={[-1.12, 0.02, 0.5]} />
			<Tree1 position={[-0.21, -4.94, 3]} />
			<Rock position={[3.04, 1.53, 0.24]} variant="5" />
			<Rock position={[3.82, -0.86, 2.24]} variant="4" />

			{/*  Chemeny zone */}
			<Tree2 position={[14.5, 1.79, 0.5]} />
			<Tree4 position={[16.78, 1.69, 0.55]} />
			<Tree6 position={[18.1, 0.68, 0.6]} />
			<Tree5 position={[18.59, -2.67, 3.3]} />
			<Tree1 position={[14.69, -6.08, 3]} />
			<Tree4 position={[17.61, -5.88, 3.4]} />
			<Tree6 position={[12.83, 1.05, 0.6]} />
			<Tree5 position={[13.36, 3.1, 0.4]} />
		</>
	);
}

export function ForestSceneMultiView() {
	const { gl, size, scene } = useThree();

	const forestViewport = useMainView((s) => s.forestView);
	const houseViewport = useMainView((s) => s.houseView);
	const chemneyViewport = useMainView((s) => s.chemneyView);

	// Создаём три камеры (ортографические), каждая со своей позицией/зумом
	const cam1 = useMemo(() => new OrthographicCamera(), []);
	const cam2 = useMemo(() => new OrthographicCamera(), []);
	const cam3 = useMemo(() => new OrthographicCamera(), []);

	// Универсальная настройка ортокамеры под конкретный viewport
	const setupOrthoForViewport = (
		cam: OrthographicCamera,
		zoom: number,
		pos: Vector3,
		vpWidth: number,
		vpHeight: number,
		lock: "height" | "width" = "height",
	) => {
		const aspect = vpWidth / vpHeight;

		let worldHalfWidth: number;
		let worldHalfHeight: number;

		if (lock === "height") {
			// Фиксируем высоту: вертикальные границы стабильны, ширина зависит от аспекта
			worldHalfHeight = 1 / zoom;
			worldHalfWidth = worldHalfHeight * aspect;
		} else {
			// Фиксируем ширину: боковые границы стабильны, высота зависит от аспекта
			worldHalfWidth = 1 / zoom;
			worldHalfHeight = worldHalfWidth / aspect;
		}

		cam.left = -worldHalfWidth;
		cam.right = worldHalfWidth;
		cam.top = worldHalfHeight;
		cam.bottom = -worldHalfHeight;
		cam.near = 0.1;
		cam.far = 1000;
		cam.position.copy(pos);
		cam.updateProjectionMatrix();
	};

	const renderToCamera = (
		camera: OrthographicCamera,
		viewportPlace: { x: number; y: number; w: number; h: number },
		worldPlace: {
			x: number;
			y: number;
			zoom: number;
			lock?: "height" | "width";
		},
		scene: Scene,
	) => {
		const vp2 = viewportPlace;
		setupOrthoForViewport(
			camera,
			worldPlace.zoom,
			new Vector3(worldPlace.x, worldPlace.y, 10),
			vp2.w,
			vp2.h,
			worldPlace.lock,
		);
		gl.setViewport(vp2.x, vp2.y, vp2.w, vp2.h);
		gl.setScissor(vp2.x, vp2.y, vp2.w, vp2.h);
		gl.render(scene, camera);
	};

	useFrame(() => {
		// Очистка кадра и управление скиссором
		gl.autoClear = false;
		gl.clear(true, true, true); // color, depth, stencil
		gl.setScissorTest(true);

		// Left forest view
		renderToCamera(cam1, forestViewport, { x: 9.6, y: 3.4, zoom: 0.4 }, scene);
		// Middle house view
		renderToCamera(
			cam2,
			houseViewport,
			{ x: 2.01, y: 0.65, zoom: 0.48, lock: "width" },
			scene,
		);
		// Right chemney view
		renderToCamera(
			cam3,
			chemneyViewport,
			{ x: 15.55, y: 3.2, zoom: 0.5 },
			scene,
		);
		gl.setScissorTest(false);
	});

	return (
		<>
			{/* Сцена монтируется ОДИН раз */}
			<ForestScene />
		</>
	);
}
