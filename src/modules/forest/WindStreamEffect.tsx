import { win32 } from "node:path";
import { useFrame, useThree } from "@react-three/fiber";
import { useWind } from "@stores/windStore.ts";
import { anglToRad } from "@utils/helpers/angles.ts";
import { randomize } from "@utils/helpers/randomize.ts";
import { useEffect, useState } from "react";
import {
	BufferGeometry,
	CatmullRomCurve3,
	Color,
	DoubleSide,
	Group,
	Line,
	LineBasicMaterial,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	PlaneGeometry,
	SphereGeometry,
	TubeGeometry,
	Vector3,
} from "three";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier";

export function WindStreamEffect() {
	const { scene, camera } = useThree();
	const [flows, setFlows] =
		useState<{ flow: Flow; speedShift: number; windMesh: Mesh }[]>(null);
	const [cloneFlows, setCloneFlows] =
		useState<{ flow: Flow; speedShift: number; windMesh: Mesh }[]>(null);
	const windEffect = {
		flowSize: 0.15,
		flowLength: 1,
		steps: 10,
		randomizePath: 1,
		randomizeSize: 0.04,
		randomizeLength: 0.5,
		randomizeSpeed: 2,
	};
	const windStrength = useWind((s) => s.strength);

	const createFlow = (
		corePoints: Array<[number, number, number]>,
		layer: number,
	) => {
		const start = corePoints[0];
		const end = corePoints[corePoints.length - 1];

		const points = [
			new Vector3(start[0] - 5, start[1], start[2]), // buffer before start
			...corePoints.map(([x, y, z]) => new Vector3(x, y, z)),
			new Vector3(end[0] + 5, end[1], end[2]), // buffer after end
		];
		const curve = new CatmullRomCurve3(points, false, "centripetal");

		const speedShift = (Math.random() + 0.5) * windEffect.randomizeSpeed;
		const length =
			windEffect.flowLength + randomize(windEffect.randomizeLength);
		const geometry = new PlaneGeometry(
			length,
			windEffect.flowSize + randomize(windEffect.randomizeSize),
			Math.round(length * 10),
			1,
		);

		geometry.rotateX(anglToRad(70));
		const material = new MeshBasicMaterial({
			color: new Color(0xe4f7ff),
			side: DoubleSide,
			toneMapped: false,
		});
		const mesh = new Mesh(geometry, material);
		mesh.frustumCulled = false;
		mesh.layers.set(layer);

		const flow = new Flow(mesh);
		flow.updateCurve(0, curve);

		const C = flow.uniforms.spineLength.value; // длина кривой
		const L = length; // ширина PlaneGeometry по X (у вас это 'length')
		flow.uniforms.spineOffset.value = L / 2; // якорим левый край на pathOffset
		flow.uniforms.pathSegment.value = 1;

		const centerComp = 0.5 * (L / C);
		flow.uniforms.pathOffset.value = 0.95 - centerComp;

		const debug = new Group();

		const tube = new TubeGeometry(curve, 200, 0.02, 8, false); // radius=0.03 — толщина
		const tubeMat = new MeshBasicMaterial({
			color: new Color(0, 0.79, 1),
			toneMapped: false,
		});
		const tubeMesh = new Mesh(tube, tubeMat);
		debug.add(tubeMesh);
		tubeMesh.layers.set(layer);

		const materialDebugPoint = new MeshBasicMaterial({
			color: new Color(0, 0.12, 0.8),
			toneMapped: false,
		});
		const geometryDebugPoint = new SphereGeometry(0.1, 4, 3);
		points.map((point) => {
			const pointMesh = new Mesh(geometryDebugPoint, materialDebugPoint);
			pointMesh.position.set(point.x, point.y, point.z);

			debug.add(pointMesh);
			pointMesh.layers.set(layer);
		});

		return {
			flow,
			debug,
			speedShift,
			windMesh: mesh,
			centerComp,
		};
	};

	useEffect(() => {
		const rawFlows = [
			createFlow(
				[
					[-2, 2.5, 1],
					[7, 3, 0.9],
					[9.5, 3.8, 0.9],
					[12.5, 3.1, 0.9],
					[15, 3.5, 1],
					[18, 2.8, 1],
				],
				1,
			),
			createFlow(
				[
					[-1.8, 0.5, 0.3],
					[2, 1.8, 1],
					[5, 1.3, 0.5],
					[8, 4.8, 0.5],
					[9, 5.2, 0.5],
					[11, 5.4, 0.5],
					[12.7, 2.8, 3],
					[15.4, 2.4, 3.7],
					[18.4, 3.4, 3],
				],
				2,
			),
			createFlow(
				[
					[-2, 1, 2.8],
					[2.5, -2.5, 2.8],
					[6, 0.5, 3.2],
					[8, 1, 4.2],
					[10 - 0.6, 1.9, 4.2],
					[10 - 0.5, 3, 4.1],
					[9, 3.3, 4],
					[8 + 0.5, 3, 3.9],
					[8 + 0.6, 2.3, 3.8],
					[10, 1.9, 3.8],
					[13, 3, 3.4],
					[18, 4.9, 3.1],
				],
				3,
			),
			createFlow(
				[
					[-2, 4.5, 0.7],
					[9, 4.5, 0.7],
					[11.5, 3.8, 0.7],
					[14, 4.5, 0.7],
					[18, 4.7, 1],
				],
				4,
			),
			createFlow(
				[
					[-2, 4, 0.7],
					[4, 1.7, 0.7],
					[8.8, 3.2, 0.7],
					[12, 2.1, 3],
					[18, 1.5, 4],
				],
				5,
			),
			createFlow(
				[
					[-2, 0.6, 2],
					[4, 2.8, 1],
					[8.4, 3.6, 0.6],
					[10, 1.6, 5.3],
					[12, 0.8, 5.3],
					[14, 2.5, 3.6],
					[15.4, 3.5, 3.1],
					[18, 0, 3.1],
				],
				6,
			),
			createFlow(
				[
					[-2, -1, 0.6],
					[2.4, 3, 0.6],
					[2.85, 2.5, 0.6],
					[2.9, 1.8, 0.6],
					[4.2, 2, 0.6],
					[7, 5, 3.1],
					[8, 4, 3.1],
					[11.3, 5.5, 3.1],
					[12, 7, 3.1],
					[13, 7, 3.1],
					[14.4, 5.1, 3.1],
					[15.7, 4.4, 3.1],
					[18, 4, 3.1],
				],
				7,
			),
			createFlow(
				[
					[-2, 0, 0.4],
					[-1, 0.7, 0.4],
					[0.7, -1.7, 2.9],
					[3.8, -3.5, 2.1],
					[4.3, -1.5, 2.1],
					[3.2, -0.96, 2.1],
					[4.7, 0.2, 2.1],
					[6.8, 0.9, 2.4],
					[9.6, 1.2, 4.8],
					[18, 4.5, 3.1],
				],
				8,
			),
			createFlow(
				[
					[-2, -1.2, 0.7],
					[7, 8, 0.7],
					[9.4, 5, 0.7],
					[11.5, 3.5, 0.7],
					[14, 3.8, 0.7],
					[18, 3.7, 1],
				],
				9,
			),
		];

		rawFlows.forEach(({ flow, debug }) => {
			scene.add(flow.object3D);
			//scene.add(debug);
		});

		setFlows(
			rawFlows.map(({ flow, speedShift, windMesh, centerComp }) => ({
				flow,
				speedShift,
				windMesh,
				centerComp,
			})),
		);

		return () => {
			rawFlows.forEach(({ flow, debug }) => {
				scene.remove(flow.object3D);
				//scene.remove(debug);
			});
		};
	}, []);

	useFrame((state, delta) => {
		flows?.forEach((flow) => {
			if (flow.flow.uniforms.pathOffset.value < 0.95 || windStrength > 1) {
				flow.flow.uniforms.pathOffset.value +=
					-0.02 * delta * windStrength * flow.speedShift;

				if (flow.flow.uniforms.pathOffset.value <= 0.05) {
					flow.flow.uniforms.pathOffset.value = 0.95 - flow.centerComp;
					flow.speedShift = (Math.random() + 0.5) * windEffect.randomizeSpeed;
				}
			}
		});
	});

	return null;
}
