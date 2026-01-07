import { useGLTF } from "@react-three/drei";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/tree_2.glb");
	return (
		<SkewWindWrapper wind_sensitivity={1}>
			<group {...props} dispose={null}>
				<SkewWindWrapper wind_sensitivity={0.5}>
					<mesh
						geometry={nodes.tree_2_green_background.geometry}
						material={materials.tree_2_green_background}
						position={[0.018, 0.418, 0.002]}
					/>
				</SkewWindWrapper>
				<SkewWindWrapper wind_sensitivity={0.5}>
					<mesh
						geometry={nodes.tree_2_green_foreground.geometry}
						material={materials.tree_2_green_foreground}
						position={[0.018, 0.418, 0.002]}
					/>
				</SkewWindWrapper>
				<mesh
					geometry={nodes.tree_2_stem.geometry}
					material={materials.tree_2_stem}
					position={[0.011, -0.006, 0.001]}
				/>
			</group>
		</SkewWindWrapper>
	);
}

useGLTF.preload("/objects/tree_2.glb");
