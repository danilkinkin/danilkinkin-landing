import { useGLTF } from "@react-three/drei";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/tree_1.glb");
	return (
		<group {...props} dispose={null}>
			<SkewWindWrapper wind_sensitivity={1}>
				<SkewWindWrapper wind_sensitivity={0.0}>
					<mesh
						geometry={nodes.tree_1_green_background.geometry}
						material={materials.tree_1_green_background}
						position={[0.029, 1.494, 0.003]}
					/>
				</SkewWindWrapper>
				<SkewWindWrapper wind_sensitivity={0.0}>
					<mesh
						geometry={nodes.tree_1_green_foreground.geometry}
						material={materials.tree_1_green_foreground}
						position={[0.029, 1.494, 0.003]}
					/>
				</SkewWindWrapper>
				<mesh
					geometry={nodes.tree_1_stem.geometry}
					material={materials.tree_1_stem}
					position={[0, -0.017, 0.002]}
				/>
			</SkewWindWrapper>
		</group>
	);
}

useGLTF.preload("/objects/tree_1.glb");
