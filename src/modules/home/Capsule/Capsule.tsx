import { useFrame } from "@utils/anim/useFrame.ts";
import { useSharedRow, useWordInRow } from "../SharedRow/SharedRow.tsx";

import styles from "./Capsule.module.css";

export function Capsule() {
	const [ref, updateSize] = useWordInRow("capsule", {
		freeGrowWeight: Number.POSITIVE_INFINITY,
	});
	const row = useSharedRow();

	useFrame(() => {
		ref.current.style.width = row.getSize("capsule").width + "px";
	});

	return <span className={styles.capsule} ref={ref} />;
}
