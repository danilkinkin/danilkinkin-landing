import { useFrame } from "@react-three/fiber";
import { useWind } from "@stores/windStore.ts";
import { useEffect, useRef } from "react";
import type { Mesh } from "three";

type PalmWindWrapperProps = {
	wind_sensitivity: number;
} & Mesh;

export function PalmWindWrapper(props: PalmWindWrapperProps) {
	const { wind_sensitivity = 1, rotation, ...restProps } = props;

	const palm = useRef<Mesh>(null);
	const stateRef = useRef({
		wind_local: -5.0,
		rotation_base: rotation || [0, 0, 0],
		current_calm: 0,
		current_strong: 0,
		shift_phase: 0,
		speed_shift: 1,
	});

	const wind_global = useWind((s) => s.strength);

	useEffect(() => {
		stateRef.current.shift_phase = Math.random() * Math.PI;
		const id = setInterval(() => {
			stateRef.current.wind_local = Math.random() * 4.0 - 2.0;
			stateRef.current.speed_shift = 0.8 + Math.random() * 0.4;
		}, 1500);

		return () => clearInterval(id);
	}, []);

	useFrame((state, delta) => {
		// Fix big delta after awakening
		let dt = Math.min(delta, 1 / 30); // не больше ~33ms
		if (dt > 0.5) dt = 0; // игнорируем первый кадр после долгой паузы

		const speed = 0.4 * stateRef.current.speed_shift + wind_global * 1.3;
		const amplitude = 0.03 + wind_global * 0.1;

		const calm_amplitude =
			Math.sin(state.clock.elapsedTime * speed + stateRef.current.shift_phase) *
				amplitude +
			stateRef.current.wind_local * 0.008;

		stateRef.current.current_calm +=
			(calm_amplitude - stateRef.current.current_calm) * dt * 0.2;

		stateRef.current.current_strong +=
			(-wind_global * 0.01 * wind_sensitivity -
				stateRef.current.current_strong) *
			dt *
			1;

		if (!palm.current) return;

		const target =
			stateRef.current.rotation_base[2] +
			stateRef.current.current_calm +
			stateRef.current.current_strong;

		palm.current.rotation.z = target;
	});

	return <mesh ref={palm} rotation={rotation} {...restProps} />;
}
