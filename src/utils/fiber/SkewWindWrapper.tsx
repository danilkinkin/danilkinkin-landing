import { useFrame } from "@react-three/fiber";
import { useWind } from "@stores/windStore.ts";
import { useEffect, useMemo, useRef } from "react";
import { type Group, Matrix4 } from "three";

type SkewWindWrapperProps = {
	children: React.ReactNode;
	wind_sensitivity?: number;
};

export function SkewWindWrapper(props: SkewWindWrapperProps) {
	const { children, wind_sensitivity = 1 } = props;

	const ref = useRef<Group>(null);
	const mat = useMemo(() => new Matrix4(), []);
	const stateRef = useRef({
		wind_local: -2.0,
		current_calm: 0,
		current_strong: 0,
	});

	const wind_global = useWind((s) => s.strength);

	useEffect(() => {
		const id = setInterval(() => {
			stateRef.current.wind_local = Math.random() * 4.0 - 2.0;
		}, 1500);

		return () => clearInterval(id);
	}, []);

	useFrame((state, delta) => {
		// Fix big delta after awakening
		let dt = Math.min(delta, 1 / 30); // не больше ~33ms
		if (dt > 0.5) dt = 0; // игнорируем первый кадр после долгой паузы

		const speed = 0.3 + wind_global * 1.2;
		const amplitude = 0.02 + wind_global * 0.03;

		const calm_amplitude =
			Math.sin(state.clock.elapsedTime * speed) * amplitude +
			stateRef.current.wind_local * 0.008;

		stateRef.current.current_calm +=
			(calm_amplitude - stateRef.current.current_calm) * dt * 0.2;

		stateRef.current.current_strong +=
			(wind_global * 0.01 * wind_sensitivity -
				stateRef.current.current_strong) *
			dt *
			1;

		const k = stateRef.current.current_calm + stateRef.current.current_strong;

		mat.makeShear(0, 0, -k, 0, 0, 0);

		if (ref.current) {
			ref.current.matrixAutoUpdate = false;
			ref.current.matrix.copy(mat);
		}
	});

	return <group ref={ref}>{children}</group>;
}
