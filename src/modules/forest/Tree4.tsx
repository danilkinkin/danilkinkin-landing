import { useGLTF } from "@react-three/drei";
import { SkewWindWrapper } from "@utils/fiber/SkewWindWrapper.tsx";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/tree_4.glb");
	return (
		<group {...props} dispose={null}>
			<SkewWindWrapper wind_sensitivity={1}>
				<mesh geometry={nodes.tree_4.geometry} material={materials.tree_4} />
			</SkewWindWrapper>
		</group>
	);
}

useGLTF.preload("/objects/tree_4.glb");
