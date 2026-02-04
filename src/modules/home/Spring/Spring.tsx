import { useFrame } from "@utils/anim/useFrame.ts";
import { useSharedRow, useWordInRow } from "../SharedRow/SharedRow.tsx";

import styles from "./Spring.module.css";

export function Spring() {
	const [ref, updateSize] = useWordInRow("spring", {
		freeGrowWeight: 0.5,
	});
	const row = useSharedRow();

	useFrame(() => {
		ref.current.style.width = row.getSize("spring").width + "px";
	});

	return <span className={styles.host} ref={ref} />;
}
