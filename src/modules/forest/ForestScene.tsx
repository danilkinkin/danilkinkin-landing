import { useFrame, useThree } from "@react-three/fiber";
import { useMainView } from "@stores/mainView.ts";
import { FlipbookAnimation } from "@utils/fiber/FlipbookAnimation.tsx";
import { folder, useControls } from "leva";
import { useMemo, useRef } from "react";
import { OrthographicCamera, type Scene, Vector3 } from "three";
import { CandleFireFlipbook } from "./CandleFire.tsx";
import { NoteParticleEmitter2D } from "./NoteParticleEmitter2D.tsx";
import { Model as Rock } from "./Rock.tsx";
import { SmokeEmitter2D } from "./SmokeEmitter2D.tsx";
import { Model as Tree1 } from "./Tree1.tsx";
import { Model as Tree2 } from "./Tree2.tsx";
import { Model as Tree3 } from "./Tree3.tsx";
import { Model as Tree4 } from "./Tree4.tsx";
import { Model as Tree5 } from "./Tree5.tsx";
import { Model as Tree6 } from "./Tree6.tsx";
import { Model as Vegetation } from "./Vegetation.tsx";
import { WindStreamEffect } from "./WindStreamEffect.tsx";
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
			<Tree2 position={[8.07, 4.25, 0.35]} />
			<Tree6 position={[10.98, -1.19, 3.5]} />
			<Tree1 position={[7.97, -3.23, 4.5]} />
			<Rock position={[9.63, 3.14, 0.5]} variant="2" />
			<Rock position={[9.1, 2.28, 0.5]} variant="3" />
			<Rock position={[8.43, 4.06, 0.3]} variant="5" />
			<Vegetation kind="mushroom" position={[9.65, 2.94, 0.7]} variant="3" />
			<Vegetation kind="grass" position={[9.43, 3.24, 0.45]} variant="3" />
			<Vegetation kind="grass" position={[9.8, 2.98, 0.65]} variant="2" />
			<Vegetation kind="bush" position={[8.43, 4.14, 0.25]} variant="5" />

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
			<SmokeEmitter2D position={[15.4, 3.2, 3.1]} />

			<WindStreamEffect />
		</>
	);
}

export function ForestSceneMultiView() {
	const { gl, size, scene } = useThree();

	const forestViewport = useMainView((s) => s.forestView);
	const houseViewport = useMainView((s) => s.houseView);
	const chemneyViewport = useMainView((s) => s.chemneyView);

	const camPos = useRef({ x: 9.6, y: 3.4, zoom: 0.4 });

	// Создаём три камеры (ортографические), каждая со своей позицией/зумом
	const cam1 = useMemo(() => new OrthographicCamera(), []);
	const cam2 = useMemo(() => new OrthographicCamera(), []);
	const cam3 = useMemo(() => new OrthographicCamera(), []);
	const cam4 = useMemo(() => new OrthographicCamera(), []);
	const cam5 = useMemo(() => new OrthographicCamera(), []);

	useControls({
		WindCam: folder(
			{
				x: {
					value: camPos.current.x,
					onChange: (v: number) => {
						camPos.current.x = v;
					},
				},
				y: {
					value: camPos.current.y,
					onChange: (v: number) => {
						camPos.current.y = v;
					},
				},
				zoom: {
					value: camPos.current.zoom,
					onChange: (v: number) => {
						camPos.current.zoom = v;
					},
				},
			},
			{ collapsed: false },
		),
	});

	// Универсальная настройка ортокамеры под конкретный viewport
	const setupOrthoForViewport = (
		cam: OrthographicCamera,
		zoom: number,
		pos: Vector3,
		vpWidth: number,
		vpHeight: number,
		lock: "height" | "width" = "height",
		center?: { x: number; y: number },
	) => {
		const aspect = vpWidth / vpHeight;

		let halfW: number;
		let halfH: number;

		if (lock === "height") {
			halfH = 1 / zoom;
			halfW = halfH * aspect;
		} else {
			halfW = 1 / zoom;
			halfH = halfW / aspect;
		}

		// Базовые границы окна ортопроекции вокруг центра
		let left = -halfW;
		let right = halfW;
		let top = halfH;
		let bottom = -halfH;

		// Переводим пиксельный сдвиг центра окна в мировые единицы
		if (center) {
			const worldPerPixelX = (2 * halfW) / vpWidth;
			const worldPerPixelY = (2 * halfH) / vpHeight;

			const dx = center.x * worldPerPixelX * -1;
			const dy = center.y * worldPerPixelY * -1;

			// Сдвигаем фрустум, НЕ трогая позицию камеры
			left += dx;
			right += dx;
			top += dy;
			bottom += dy;
		}

		cam.left = left;
		cam.right = right;
		cam.top = top;
		cam.bottom = bottom;

		cam.near = 0.1;
		cam.far = 1000;

		// Камера остаётся в мировой "центральной" точке (или заданной pos)
		cam.position.set(pos.x, pos.y, pos.z);

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
			center?: { x: number; y: number };
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
			worldPlace.center,
		);
		gl.setViewport(vp2.x, vp2.y, vp2.w, vp2.h);
		gl.setScissor(vp2.x, vp2.y, vp2.w, vp2.h);
		gl.render(scene, camera);
	};

	// Рендер "липкой" камеры, которая прилипает к базовой слева/справа с идеальным швом при lock="height"
	const renderToStickyCamera = (
		stickyCam: OrthographicCamera,
		stickyViewport: { x: number; y: number; w: number; h: number },
		baseViewport: { x: number; y: number; w: number; h: number },
		baseWorld: {
			x: number;
			y: number;
			zoom: number;
			lock?: "height" | "width";
		},
		scene: Scene,
		options: {
			side: "left" | "right"; // куда прилипать относительно базовой камеры
			pixelYUpwards?: boolean; // true если viewport.y считает снизу вверх (WebGL), false если сверху вниз (DOM)
		},
	) => {
		// 1) Выравниваем world-per-pixel по Y: (2/zoom)/vp.h должно совпадать
		const zoom1 = baseWorld.zoom;
		const vp1 = baseViewport;
		const vpS = stickyViewport;

		const zoomS = zoom1 * (vp1.h / vpS.h);

		// 2) Половинные размеры фрустумов (lock="height")
		const aspect1 = vp1.w / vp1.h;
		const aspectS = vpS.w / vpS.h;

		const halfH1 = 1 / zoom1;
		const halfW1 = halfH1 * aspect1;

		const halfHS = 1 / zoomS;
		const halfWS = halfHS * aspectS;

		// 3) Центры базовой камеры в мире
		const x1 = baseWorld.x;
		const y1 = baseWorld.y;

		// 4) Горизонтальный шов: выбираем формулу по стороне
		let xS: number;
		if (options.side === "left") {
			// липкая слева от базовой: правый край sticky == левый край base
			xS = x1 - halfW1 - halfWS;
		} else {
			// липкая справа от базовой: левый край sticky == правый край base
			xS = x1 + halfW1 + halfWS;
		}

		// 5) Вертикальный шов: учесть разницу экранных центров
		const centerY1_px = vp1.y + vp1.h / 2;
		const centerYS_px = vpS.y + vpS.h / 2;
		const dCyPixels = centerY1_px - centerYS_px;

		// world-per-pixel Y (общий после шага 1)
		const wppY = 2 / zoom1 / vp1.h;

		const pixelYUpwards = options.pixelYUpwards ?? false; // DOM: false; WebGL: true
		const dyWorld = (pixelYUpwards ? 1 : -1) * dCyPixels * wppY;
		const yS = y1 + dyWorld;

		// 6) Рендер липкой камеры
		setupOrthoForViewport(
			stickyCam,
			zoomS,
			new Vector3(xS, yS, 10),
			vpS.w,
			vpS.h,
			"height",
		);
		gl.setViewport(vpS.x, vpS.y, vpS.w, vpS.h);
		gl.setScissor(vpS.x, vpS.y, vpS.w, vpS.h);
		gl.render(scene, stickyCam);
	};

	useFrame(() => {
		// Очистка кадра и управление скиссором
		gl.autoClear = false;
		gl.clear(true, true, true); // color, depth, stencil
		gl.setScissorTest(true);

		const baseForestWorld = { x: 9.6, y: 3.4, zoom: 0.4, lock: "height" };

		cam4.layers.disableAll();
		cam4.layers.enable(2);
		cam4.layers.enable(3);
		cam4.layers.enable(4);
		renderToStickyCamera(
			cam4,
			{ x: 0, y: 0, w: forestViewport.x, h: size.height },
			forestViewport,
			baseForestWorld,
			scene,
			{
				side: "left",
				pixelYUpwards: false,
			},
		);

		// Left forest view (cam1) — как было
		cam1.layers.enableAll();
		renderToCamera(cam1, forestViewport, baseForestWorld, scene);

		// Middle house view
		cam2.layers.enableAll();
		renderToCamera(
			cam2,
			houseViewport,
			{ x: 2.01, y: 0.65, zoom: 0.48, lock: "width" },
			scene,
		);
		// Right chemney view

		const baseChemneyWorld = { x: 15.55, y: 3.2, zoom: 0.5 };

		cam5.layers.disableAll();
		cam5.layers.enable(1);
		cam5.layers.enable(2);
		cam5.layers.enable(3);
		cam5.layers.enable(4);
		cam5.layers.enable(5);
		renderToStickyCamera(
			cam5,
			{
				x: chemneyViewport.x + chemneyViewport.w,
				y: 0,
				w: size.width - (chemneyViewport.x + chemneyViewport.w),
				h: size.height,
			},
			chemneyViewport,
			baseChemneyWorld,
			scene,
			{
				side: "right",
				pixelYUpwards: false,
			},
		);

		cam3.layers.enableAll();
		renderToCamera(cam3, chemneyViewport, baseChemneyWorld, scene);

		gl.setScissorTest(false);
	});

	return (
		<>
			{/* Сцена монтируется ОДИН раз */}
			<ForestScene />
		</>
	);
}
