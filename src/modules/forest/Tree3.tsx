import { useGLTF } from "@react-three/drei";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/tree_3.glb");
	return (
		<SkewWindWrapper wind_sensitivity={1}>
			<group {...props} dispose={null}>
				<mesh geometry={nodes.tree_3.geometry} material={materials.tree_3} />
			</group>
		</SkewWindWrapper>
	);
}

useGLTF.preload("/objects/tree_3.glb");
