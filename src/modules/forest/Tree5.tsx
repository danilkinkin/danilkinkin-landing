import { useGLTF } from "@react-three/drei";
import { PalmWindWrapper } from "@utils/fiber/PalmWindWrapper.tsx";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/tree_5.glb");

	return (
		<group {...props} dispose={null}>
			<SkewWindWrapper wind_sensitivity={1}>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_1.geometry}
					material={materials.tree_5_green_1}
					position={[-0.357, 2.296, 0.001]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_10.geometry}
					material={materials.tree_5_green_10}
					position={[0.022, 3.914, 0.008]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_2.geometry}
					material={materials.tree_5_green_2}
					position={[-0.067, 2.291, 0.002]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_3.geometry}
					material={materials.tree_5_green_3}
					position={[0.053, 2.258, 0.002]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_4.geometry}
					material={materials.tree_5_green_4}
					position={[0.135, 2.289, 0.003]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_5.geometry}
					material={materials.tree_5_green_5}
					position={[-0.18, 3.138, 0.004]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_6.geometry}
					material={materials.tree_5_green_6}
					position={[-0.022, 3.096, 0.005]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_7.geometry}
					material={materials.tree_5_green_7}
					position={[-0.034, 3.048, 0.006]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_8.geometry}
					material={materials.tree_5_green_8}
					position={[0.006, 3.914, 0.007]}
				/>
				<PalmWindWrapper
					geometry={nodes.tree_5_green_9.geometry}
					material={materials.tree_5_green_9}
					position={[-0.008, 3.947, 0.007]}
				/>
				<mesh
					geometry={nodes.tree_5_stem.geometry}
					material={materials.tree_5_stem}
					position={[-0.001, -0.003, 0]}
				/>
			</SkewWindWrapper>
		</group>
	);
}

useGLTF.preload("/objects/tree_5.glb");
