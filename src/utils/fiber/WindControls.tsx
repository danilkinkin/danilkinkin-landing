import { useWind } from "@stores/windStore.ts";
import { button, folder, Leva, useControls } from "leva";

export function WindControls() {
	const strength = useWind((s) => s.strength);
	const setStrength = useWind((s) => s.setStrength);

	// Leva drives the store; controls show current store values
	useControls({
		Wind: folder(
			{
				strength: {
					value: strength,
					min: 0,
					max: 10,
					step: 0.01,
					onChange: (v: number) => setStrength(v),
				},
				reset: button(() => {
					setStrength(0);
				}),
			},
			{ collapsed: false },
		),
	});

	// Leva panel
	return <Leva collapsed={false} oneLineLabels />;
}
