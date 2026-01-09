import { FlipbookAnimation } from "@utils/fiber/FlipbookAnimation.tsx";

export function CandleFireFlipbook({
	shift = 0,
	...restProps
}: { shift?: number } & JSX.IntrinsicElements["mesh"]) {
	return (
		<FlipbookAnimation
			assetName="candle_fire"
			count={4}
			position={restProps.position}
			ref={restProps.ref}
			rotation={restProps.rotation}
			scale={restProps.scale}
			size={[26 * 0.0037, 64 * 0.0037]}
			startShift={shift}
		/>
	);
}
