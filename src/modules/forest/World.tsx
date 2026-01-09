import { useGLTF } from "@react-three/drei";

export function Model(props) {
	const { nodes, materials } = useGLTF("/objects/world.glb");
	return (
		<group {...props} dispose={null}>
			<group position={[2.112, 0.06, 1.991]}>
				<mesh
					geometry={nodes.fireplace_back.geometry}
					material={materials.fireplace_back}
					position={[-0.002, 0.116, 0]}
				/>
				<mesh
					geometry={nodes.fireplace_front.geometry}
					material={materials.fireplace_front}
					position={[-0.009, 0.113, 0.1]}
				/>
			</group>
			<mesh
				geometry={nodes.painting_1_1_round_flower.geometry}
				material={materials.painting_1_1_round_flower}
				position={[0.415, 0.875, 1.953]}
			/>
			<mesh
				geometry={nodes.painting_1_1_round_paw.geometry}
				material={materials.painting_1_1_round_paw}
				position={[1.532, 2.467, 1.953]}
			/>
			<mesh
				geometry={nodes.painting_1_2_square_serenity.geometry}
				material={materials.painting_1_2_square_serenity}
				position={[1.154, 1.875, 1.953]}
			/>
			<mesh
				geometry={nodes.painting_2_2_square_cat.geometry}
				material={materials.painting_2_2_square_cat}
				position={[3.46, 1.384, 1.953]}
			/>
			<mesh
				geometry={nodes.painting_2_2_square_cat_in_lake.geometry}
				material={materials.painting_2_2_square_cat_in_lake}
				position={[2.377, 2.036, 1.953]}
			/>
			<mesh
				geometry={nodes.painting_2_2_square_starlight_night.geometry}
				material={materials.painting_2_2_square_starlight_night}
				position={[0.76, 1.648, 1.953]}
			/>
			<mesh
				geometry={nodes.carpet_2_1_1.geometry}
				material={materials.carpet_2_1_1}
				position={[0.648, -0.107, 1.938]}
			/>
			<mesh
				geometry={nodes.carpet_2_2_1.geometry}
				material={materials.carpet_2_2_1}
				position={[1.988, -1.107, 2.442]}
			/>
			<mesh
				geometry={nodes.carpet_2_2_3.geometry}
				material={materials.carpet_2_2_3}
				position={[1.626, -0.303, 1.938]}
			/>
			<mesh
				geometry={nodes.carpet_2_2_4.geometry}
				material={materials.carpet_2_2_4}
				position={[1.711, 1.387, 1.976]}
			/>
			<mesh
				geometry={nodes.bed_2.geometry}
				material={materials.bed_2}
				position={[2.456, -0.237, 2.216]}
			/>
			<mesh
				geometry={nodes.candle_1.geometry}
				material={materials.candle_1}
				position={[1.292, 1.304, 1.955]}
			/>
			<mesh
				geometry={nodes.lamp_on.geometry}
				material={materials.lamp_on}
				position={[2.888, -0.143, 2.322]}
			/>
			<mesh
				geometry={nodes.basement.geometry}
				material={materials.basement}
				position={[3.284, 0.818, 1.95]}
			/>
			<mesh
				geometry={nodes["pot-background"].geometry}
				material={materials["pot-background"]}
				position={[0.897, 0.857, 1.937]}
			/>
			<mesh
				geometry={nodes["pot-foreground"].geometry}
				material={materials["pot-foreground"]}
				position={[0.897, 0.857, 1.942]}
			/>
			<mesh
				geometry={nodes.water_can.geometry}
				material={materials.water_can}
				position={[2.617, -0.778, 2.457]}
			/>
			<mesh
				geometry={nodes["pot-background001"].geometry}
				material={materials["pot-background"]}
				position={[1.481, -0.829, 2.446]}
			/>
			<mesh
				geometry={nodes["pot-foreground001"].geometry}
				material={materials["pot-foreground"]}
				position={[1.481, -0.829, 2.451]}
			/>
			<mesh
				geometry={nodes["pot-background002"].geometry}
				material={materials["pot-background"]}
				position={[1.379, -1.127, 2.446]}
			/>
			<mesh
				geometry={nodes["pot-foreground002"].geometry}
				material={materials["pot-foreground"]}
				position={[1.379, -1.127, 2.451]}
			/>
			<mesh
				geometry={nodes.lamp_on001.geometry}
				material={materials.lamp_on}
				position={[1.955, 1.892, 1.934]}
			/>
			<mesh
				geometry={nodes.house_first_floor.geometry}
				material={materials.house_first_floor}
				position={[1.942, -0.039, 1.482]}
			/>
			<mesh geometry={nodes.terrain.geometry} material={materials.terrain} />
			<group position={[1.953, 0.17, 1.921]}>
				<mesh
					geometry={nodes.half_floor_railing_section_1.geometry}
					material={materials.half_floor_railing_section_1}
					position={[0.251, 0.692, 0.127]}
				/>
				<mesh
					geometry={nodes.half_floor_railing_section_2.geometry}
					material={materials.half_floor_railing_section_2}
					position={[0.972, 0.262, 0.128]}
				/>
				<mesh
					geometry={nodes.house_half_floor_back.geometry}
					material={materials.house_half_floor_back}
					position={[0.006, 1.377, 0]}
				/>
				<mesh
					geometry={nodes.house_half_floor_front.geometry}
					material={materials.house_half_floor_front}
					position={[0.581, 0.483, 0.004]}
				/>
				<mesh
					geometry={nodes.staircase_railing.geometry}
					material={materials.staircase_railing}
					position={[-0.556, 0.544, 0.128]}
				/>
			</group>
			<group position={[2.258, -1.227, 2.42]}>
				<mesh
					geometry={nodes.greenhouse_floor.geometry}
					material={materials.greenhouse_floor}
					position={[0.015, -0.459, 0]}
				/>
			</group>
			<mesh
				geometry={nodes.house_first_floor001.geometry}
				material={materials.house_first_floor}
				position={[14.815, -0.039, 1.482]}
			/>
			<mesh
				geometry={nodes.terrain001.geometry}
				material={materials.terrain}
				position={[12.873, 0, 0]}
			/>
			<group position={[14.826, 0.17, 1.921]}>
				<mesh
					geometry={nodes.half_floor_railing_section_1001.geometry}
					material={materials.half_floor_railing_section_1}
					position={[0.251, 0.692, 0.002]}
				/>
				<mesh
					geometry={nodes.half_floor_railing_section_2001.geometry}
					material={materials.half_floor_railing_section_2}
					position={[0.972, 0.262, 0.003]}
				/>
				<mesh
					geometry={nodes.house_half_floor_back001.geometry}
					material={materials.house_half_floor_back}
					position={[0.006, 1.377, 0]}
				/>
				<mesh
					geometry={nodes.house_half_floor_front001.geometry}
					material={materials.house_half_floor_front}
					position={[0.581, 0.483, 0.001]}
				/>
				<mesh
					geometry={nodes.staircase_railing001.geometry}
					material={materials.staircase_railing}
					position={[-0.556, 0.544, 0.003]}
				/>
			</group>
			<group position={[15.131, -1.227, 2.42]}>
				<mesh
					geometry={nodes.greenhouse_floor001.geometry}
					material={materials.greenhouse_floor}
					position={[0.015, -0.459, 0]}
				/>
				<mesh
					geometry={nodes.greenhouse_front001.geometry}
					material={materials.greenhouse_front}
					position={[0.03, 0.396, 0.002]}
				/>
				<mesh
					geometry={nodes.greenhouse_left_wall001.geometry}
					material={materials.greenhouse_left_wall}
					position={[-1.199, 0.922, 0.001]}
				/>
				<mesh
					geometry={nodes.greenhouse_right_wall001.geometry}
					material={materials.greenhouse_right_wall}
					position={[1.033, 0.82, 0.001]}
				/>
			</group>
			<group position={[14.866, 1.689, 2.601]}>
				<mesh
					geometry={nodes.second_floor001.geometry}
					material={materials.second_floor}
					position={[-0.456, 0.773, 0]}
				/>
			</group>
			<group position={[14.744, -0.06, 2.169]}>
				<mesh
					geometry={nodes.wall_left_bottom001.geometry}
					material={materials.wall_left_bottom}
					position={[-1.189, 0.483, 0]}
				/>
				<mesh
					geometry={nodes.wall_right_bottom001.geometry}
					material={materials.wall_right_bottom}
					position={[0.88, 0.572, 0.001]}
				/>
			</group>
			<group position={[14.16, 2.082, 3.021]}>
				<mesh
					geometry={nodes.frist_floor_roof001.geometry}
					material={materials.frist_floor_roof}
					position={[1.333, -0.704, 0.001]}
				/>
				<mesh
					geometry={nodes.second_floor_roof001.geometry}
					material={materials.second_floor_roof}
					position={[0.21, 0.702, 0.002]}
				/>
				<mesh
					geometry={nodes.second_floor_walls001.geometry}
					material={materials.second_floor_walls}
					position={[0.253, 0.016, 0]}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("/objects/world.glb");
