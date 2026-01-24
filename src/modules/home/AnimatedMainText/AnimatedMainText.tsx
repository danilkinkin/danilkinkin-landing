import { useFrame } from "@utils/anim/useFrame.ts";
import { Design } from "../Design/Design.tsx";
import { Etical } from "../Etical/Etical.tsx";
import {
	SharedRow,
	useSharedRow,
	useWordInRow,
} from "../SharedRow/SharedRow.tsx";
import { Word as W } from "../Word/Word.tsx";

import styles from "./AnimatedMainText.module.css";

function Spring() {
	const [ref, updateSize] = useWordInRow("spring", {
		freeGrowWeight: 0.5,
	});
	const row = useSharedRow();

	useFrame(() => {
		ref.current.style.width = row.getSize("spring").width + "px";
	});

	return <span className={styles.spring} ref={ref} />;
}

function Capsule() {
	const [ref, updateSize] = useWordInRow("capsule", {
		freeGrowWeight: Number.POSITIVE_INFINITY,
	});
	const row = useSharedRow();

	useFrame(() => {
		ref.current.style.width = row.getSize("capsule").width + "px";
	});

	return <span className={styles.capsule} ref={ref} />;
}

export function AnimatedMainText() {
	return (
		<p className={styles.host}>
			<SharedRow>
				<W>Work</W>
				<W>only</W>
				<Etical />
				<W>products.</W>
			</SharedRow>
			<SharedRow>
				<W>Into</W>
				<Spring />
				<W>code,</W>
				<W>clean</W>
				<Design />
				<W>and</W>
				<W>crafting</W>
			</SharedRow>
			<SharedRow>
				<W>stuff</W>
				<W>that</W>
				<W>feels</W>
				<Capsule />
				<W>right</W>
			</SharedRow>
		</p>
	);
}
