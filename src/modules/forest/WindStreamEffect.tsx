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
		offset: [number, number, number] = [0, 0, 0],
	) => {
		const start = corePoints[0];
		const end = corePoints[corePoints.length - 1];

		const points = [
			new Vector3(
				start[0] - 5 + offset[0],
				start[1] + offset[1],
				start[2] + offset[2],
			), // buffer before start
			...corePoints.map(
				([x, y, z]) => new Vector3(x + offset[0], y + offset[1], z + offset[2]),
			),
			new Vector3(
				end[0] + 5 + offset[0],
				end[1] + offset[1],
				end[2] + offset[2],
			), // buffer after end
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
			color: new Color(0, 0.79, 1),
			side: DoubleSide,
			toneMapped: false,
		});
		const mesh = new Mesh(geometry, material);
		mesh.frustumCulled = false;
		mesh.layers.set(1);

		const flow = new Flow(mesh);
		flow.updateCurve(0, curve);

		const C = flow.uniforms.spineLength.value; // длина кривой
		const L = length; // ширина PlaneGeometry по X (у вас это 'length')
		flow.uniforms.spineOffset.value = L / 2; // якорим левый край на pathOffset
		flow.uniforms.pathSegment.value = 1;

		const centerComp = 0.5 * (L / C);
		flow.uniforms.pathOffset.value = 0.95 - centerComp;

		const debug = new Group();

		const tube = new TubeGeometry(curve, 100, 0.02, 8, false); // radius=0.03 — толщина
		const tubeMat = new MeshBasicMaterial({
			color: new Color(0, 0.79, 1),
			toneMapped: false,
		});
		const tubeMesh = new Mesh(tube, tubeMat);
		debug.add(tubeMesh);
		tubeMesh.layers.set(1);

		const materialDebugPoint = new MeshBasicMaterial({
			color: new Color(0, 0.12, 0.8),
			toneMapped: false,
		});
		const geometryDebugPoint = new SphereGeometry(0.1, 4, 3);
		points.map((point) => {
			const pointMesh = new Mesh(geometryDebugPoint, materialDebugPoint);
			pointMesh.position.set(point.x, point.y, point.z);

			debug.add(pointMesh);
			pointMesh.layers.set(1);
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
			createFlow([
				[-2, 2.5, 1],
				[7, 3, 0.9],
				[9.5, 3.8, 0.9],
				[12.5, 3.1, 0.9],
				[15, 3.5, 1],
				[18, 2.8, 1],
			]),
			createFlow([
				[-1.8, 0.5, 0.3],
				[2, 1.8, 1],
				[5, 1.3, 0.5],
				[8, 4.8, 0.5],
				[9, 5.2, 0.5],
				[11, 5.4, 0.5],
				[12.7, 2.8, 3],
				[15.4, 2.4, 3.7],
				[18.4, 3.4, 3],
			]),
			createFlow([
				[-2, 1.5, 3.8],
				[8, 1.5, 3.8],
				[10 - 0.6, 2.5, 3.8],
				[9, 3.5, 3.8],
				[8 + 0.6, 2.5, 3.8],
				[10, 1.8, 3.8],
				[18, 1.8, 3.8],
			]),
		];

		rawFlows.forEach(({ flow, debug }) => {
			scene.add(flow.object3D);
			scene.add(debug);
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
				scene.remove(debug);
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
