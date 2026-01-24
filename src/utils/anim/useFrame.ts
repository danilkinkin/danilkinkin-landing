import { useEffect } from "react";

export function useFrame(callback: () => void) {
	useEffect(() => {
		let active = true;

		const frame = () => {
			callback();

			if (active) requestAnimationFrame(frame);
		};

		requestAnimationFrame(frame);

		return () => {
			active = false;
		};
	}, [callback]);
}
