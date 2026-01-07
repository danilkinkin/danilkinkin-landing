import { useGLTF } from "@react-three/drei";
import type { BufferGeometry, Material } from "three";

type ModelProps = JSX.IntrinsicElements["group"] & {
	variant: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
};

export function Model(props: ModelProps) {
	const { variant = "1", ...restProps } = props;
	const { nodes, materials } = useGLTF("/objects/rocks.glb");

	const variants: {
		[key in ModelProps["variant"]]: {
			geometry: BufferGeometry;
			material: Material;
		};
	} = {
		"1": {
			geometry: nodes.stone_1.geometry,
			material: materials.stone_1,
		},
		"2": {
			geometry: nodes.stone_2.geometry,
			material: materials.stone_2,
		},
		"3": {
			geometry: nodes.stone_3.geometry,
			material: materials.stone_3,
		},
		"4": {
			geometry: nodes.stone_4.geometry,
			material: materials.stone_4,
		},
		"5": {
			geometry: nodes.stone_5.geometry,
			material: materials.stone_5,
		},
		"6": {
			geometry: nodes.stone_6.geometry,
			material: materials.stone_6,
		},
		"7": {
			geometry: nodes.stone_7.geometry,
			material: materials.stone_7,
		},
		"8": {
			geometry: nodes.stone_8.geometry,
			material: materials.stone_8,
		},
		"9": {
			geometry: nodes.stone_9.geometry,
			material: materials.stone_9,
		},
	};

	return (
		<group {...restProps} dispose={null}>
			<mesh
				geometry={variants[variant].geometry}
				material={variants[variant].material}
			/>
		</group>
	);
}

useGLTF.preload("/objects/rocks.glb");
