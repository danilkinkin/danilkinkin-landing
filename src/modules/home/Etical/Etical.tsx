import { useFrame } from "@utils/anim/useFrame.ts";
import { useEffect, useRef } from "react";
import { useSharedRow } from "../SharedRow/SharedRow.tsx";
import { Word as W } from "../Word/Word.tsx";
import Underline from "./undeline.svg?react";

import styles from "./Etical.module.css";

export function Etical() {
	const row = useSharedRow();
	const underlineRef = useRef<SVGAElement>(null);

	useFrame(() => {
		const underlineEl = underlineRef.current;

		if (!underlineEl) return;

		const start = row.getSize("etical:first");
		const end = row.getSize("etical:last");

		underlineEl.style.left = start.left + "px";
		underlineEl.style.top = start.height - 8 + "px";
		underlineEl.style.width = end.left + end.width - start.left + "px";
	});

	return (
		<span className={styles.host}>
			<W id="etical:first">on</W> <W>ethical,</W>{" "}
			<W id="etical:last">user‑first</W>
			<Underline className={styles.underline} ref={underlineRef} />
		</span>
	);
}
