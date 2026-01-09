import { useGLTF } from "@react-three/drei";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";
import type { BufferGeometry, Material } from "three";

type ModelProps = JSX.IntrinsicElements["group"] &
	(
		| {
				kind: "bush";
				variant: "1" | "2" | "3" | "4" | "5";
		  }
		| {
				kind: "mushroom";
				variant: "1" | "2" | "3";
		  }
		| {
				kind: "grass";
				variant: "1" | "2" | "3" | "4" | "5" | "6";
		  }
	);

export function Model(props: ModelProps) {
	const { kind = "bush", variant = "1", ...restProps } = props;
	const { nodes, materials } = useGLTF("/objects/vegetation.glb");

	const brushVariants: {
		[key in ModelProps["variant"]]: {
			geometry: BufferGeometry;
			material: Material;
		};
	} = {
		"1": {
			geometry: nodes.bush_1.geometry,
			material: materials.bush_1,
		},
		"2": {
			geometry: nodes.bush_2.geometry,
			material: materials.bush_2,
		},
		"3": {
			geometry: nodes.bush_3.geometry,
			material: materials.bush_3,
		},
		"4": {
			geometry: nodes.bush_4.geometry,
			material: materials.bush_4,
		},
		"5": {
			geometry: nodes.bush_5.geometry,
			material: materials.bush_5,
		},
		config: {
			wind_sensitivity: 1,
		},
	};

	const grassVariants: {
		[key in ModelProps["variant"]]: {
			geometry: BufferGeometry;
			material: Material;
		};
	} = {
		"1": {
			geometry: nodes.grass_1.geometry,
			material: materials.grass_1,
		},
		"2": {
			geometry: nodes.grass_2.geometry,
			material: materials.grass_2,
		},
		"3": {
			geometry: nodes.grass_3.geometry,
			material: materials.grass_3,
		},
		"4": {
			geometry: nodes.grass_4.geometry,
			material: materials.grass_4,
		},
		"5": {
			geometry: nodes.grass_5.geometry,
			material: materials.grass_5,
		},
		"6": {
			geometry: nodes.grass_6.geometry,
			material: materials.grass_6,
		},
		config: {
			wind_sensitivity: 3,
		},
	};

	const mushroomVariants: {
		[key in ModelProps["variant"]]: {
			geometry: BufferGeometry;
			material: Material;
		};
	} = {
		"1": {
			geometry: nodes.mushroom_1.geometry,
			material: materials.mushroom_1,
		},
		"2": {
			geometry: nodes.mushroom_2.geometry,
			material: materials.mushroom_2,
		},
		"3": {
			geometry: nodes.mushroom_3.geometry,
			material: materials.mushroom_3,
		},
		config: {
			wind_sensitivity: 1,
		},
	};

	const variants: {
		[k in ModelProps["kind"]]: any;
	} = {
		bush: brushVariants,
		grass: grassVariants,
		mushroom: mushroomVariants,
	};

	return (
		<group {...restProps} dispose={null}>
			<SkewWindWrapper
				wind_sensitivity={variants[kind].config.wind_sensitivity}
			>
				<mesh
					geometry={variants[kind][variant].geometry}
					material={variants[kind][variant].material}
				/>
			</SkewWindWrapper>
		</group>
	);
}

useGLTF.preload("/objects/vegetation.glb");
