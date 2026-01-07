import { useGLTF } from "@react-three/drei";
import { PalmWindWrapper } from "@utils/fiber/PalmWindWrapper.tsx";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/tree_6.glb");

	return (
		<SkewWindWrapper wind_sensitivity={1}>
			<group {...props} dispose={null}>
				<mesh
					geometry={nodes.Tree_6.geometry}
					material={materials.tree_6_stem}
					position={[0.001, -0.001, 0]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_1.geometry}
					material={materials.tree_6_green_1}
					position={[-0.022, 0.556, 0.002]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_10.geometry}
					material={materials.tree_6_green_10}
					position={[-0.005, 0.64, 0.01]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_11.geometry}
					material={materials.tree_6_green_11}
					position={[-0.024, 0.844, 0.011]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_12.geometry}
					material={materials.tree_6_green_12}
					position={[-0.016, 0.825, 0.013]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_13.geometry}
					material={materials.tree_6_green_13}
					position={[0.017, 0.84, 0.012]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_14.geometry}
					material={materials.tree_6_green_14}
					position={[0.005, 0.827, 0.014]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_15.geometry}
					material={materials.tree_6_green_15}
					position={[-0.006, 0.936, 0.015]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_16.geometry}
					material={materials.tree_6_green_16}
					position={[-0.011, 0.926, 0.017]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_17.geometry}
					material={materials.tree_6_green_17}
					position={[-0.011, 0.926, 0.017]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_2.geometry}
					material={materials.tree_6_green_2}
					position={[-0.029, 0.501, 0.003]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_3.geometry}
					material={materials.tree_6_green_3}
					position={[0.016, 0.561, 0.001]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_4.geometry}
					material={materials.tree_6_green_4}
					position={[0.019, 0.496, 0.004]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_5.geometry}
					material={materials.tree_6_green_5}
					position={[-0.006, 0.487, 0.005]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_6.geometry}
					material={materials.tree_6_green_6}
					position={[-0.032, 0.692, 0.006]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_7.geometry}
					material={materials.tree_6_green_7}
					position={[-0.016, 0.647, 0.008]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_8.geometry}
					material={materials.tree_6_green_8}
					position={[0.014, 0.697, 0.007]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_6_green_9.geometry}
					material={materials.tree_6_green_9}
					position={[0.034, 0.636, 0.009]}
				/>
			</group>
		</SkewWindWrapper>
	);
}

useGLTF.preload("/objects/tree_6.glb");
