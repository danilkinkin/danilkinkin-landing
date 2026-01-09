import { useGLTF } from "@react-three/drei";
import { PalmWindWrapper } from "@utils/fiber/PalmWindWrapper.tsx";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/tree_6.glb");

	return (
		<group {...props} dispose={null}>
			<SkewWindWrapper wind_sensitivity={1}>
				<mesh
					geometry={nodes.Tree_6.geometry}
					material={materials.tree_6_stem}
					position={[0.004, -0.006, 0]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_1.geometry}
					material={materials.tree_6_green_1}
					position={[-0.094, 2.333, 0.008]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_10.geometry}
					material={materials.tree_6_green_10}
					position={[-0.02, 2.689, 0.042]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_11.geometry}
					material={materials.tree_6_green_11}
					position={[-0.1, 3.543, 0.046]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_12.geometry}
					material={materials.tree_6_green_12}
					position={[-0.067, 3.463, 0.055]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_13.geometry}
					material={materials.tree_6_green_13}
					position={[0.07, 3.526, 0.05]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_14.geometry}
					material={materials.tree_6_green_14}
					position={[0.02, 3.472, 0.059]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_15.geometry}
					material={materials.tree_6_green_15}
					position={[-0.027, 3.931, 0.063]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_16.geometry}
					material={materials.tree_6_green_16}
					position={[-0.047, 3.89, 0.072]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_17.geometry}
					material={materials.tree_6_green_17}
					position={[-0.047, 3.89, 0.072]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_2.geometry}
					material={materials.tree_6_green_2}
					position={[-0.123, 2.105, 0.013]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_3.geometry}
					material={materials.tree_6_green_3}
					position={[0.069, 2.355, 0.004]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_4.geometry}
					material={materials.tree_6_green_4}
					position={[0.081, 2.083, 0.017]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_5.geometry}
					material={materials.tree_6_green_5}
					position={[-0.024, 2.046, 0.021]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_6.geometry}
					material={materials.tree_6_green_6}
					position={[-0.135, 2.906, 0.025]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_7.geometry}
					material={materials.tree_6_green_7}
					position={[-0.068, 2.716, 0.034]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_8.geometry}
					material={materials.tree_6_green_8}
					position={[0.059, 2.925, 0.029]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_9.geometry}
					material={materials.tree_6_green_9}
					position={[0.143, 2.669, 0.038]}
				/>
			</SkewWindWrapper>
		</group>
	);
}

useGLTF.preload("/objects/tree_6.glb");
