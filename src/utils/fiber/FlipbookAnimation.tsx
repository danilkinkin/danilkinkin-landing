import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type FlipbookAnimationProps = {
	intervalMs?: number;
	assetName: string;
	count: number;
	startShift?: number;
	size: [number, number];
} & JSX.IntrinsicElements["mesh"];

export function FlipbookAnimation(props: FlipbookAnimationProps) {
	const {
		intervalMs = 140,
		assetName,
		count,
		size,
		startShift = 0,
		...restProps
	} = props;

	const assetsArray: string[] = useMemo(() => {
		return Array.from(
			{ length: count },
			(_, i) => `/sprites/${assetName}_${i + 1}.png`,
		);
	}, [assetName, count]);

	const textures = useLoader(THREE.TextureLoader, assetsArray);
	const material = useMemo(() => new THREE.MeshBasicMaterial(), []);
	const indexRef = useRef(startShift);
	const lastSwitchRef = useRef(0);

	// Настройка текстур
	useMemo(() => {
		textures.forEach((t) => {
			t.wrapS = THREE.ClampToEdgeWrapping;
			t.wrapT = THREE.ClampToEdgeWrapping;
			t.minFilter = THREE.LinearMipMapLinearFilter;
			t.magFilter = THREE.LinearFilter;
			t.anisotropy = 1;
			t.colorSpace = THREE.SRGBColorSpace; // если ваши исходники в sRGB
		});
	}, [textures]);

	// Инициализация материала
	useEffect(() => {
		material.map = textures[0];
		material.transparent = true;
		material.depthWrite = true;
		material.depthTest = true;
		material.needsUpdate = true;
		return () => {
			material.dispose();
			textures.forEach((t) => t.dispose());
		};
	}, [material, textures]);

	// Смена кадра каждые intervalMs
	useFrame((state) => {
		const t = state.clock.elapsedTime * 1000; // ms
		if (t - lastSwitchRef.current >= intervalMs) {
			lastSwitchRef.current = t;
			indexRef.current = (indexRef.current + 1) % textures.length;
			material.map = textures[indexRef.current];
			material.needsUpdate = true;
		}
	});

	return (
		<mesh
			position={restProps.position}
			ref={restProps.ref}
			rotation={restProps.rotation}
			scale={restProps.scale}
		>
			<planeGeometry args={size} />
			<primitive attach="material" object={material} />
		</mesh>
	);
}
