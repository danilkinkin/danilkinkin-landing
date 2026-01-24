import { useWind } from "@stores/windStore.ts";
import { useCallback, useEffect, useRef } from "react";

import styles from "./InteractionWithWorld.module.css";

export function InteractionWithWorld() {
	const hostRef = useRef<HTMLButtonElement>(null);
	const setWindForce = useWind((s) => s.setStrength);

	const makeWindStrong = useCallback(() => {
		setWindForce(10);
	}, [setWindForce]);

	const makeWindCalm = useCallback(() => {
		setWindForce(0);
	}, [setWindForce]);

	// Mouse down handler
	const handleDown = useCallback(() => {
		makeWindStrong();

		const handleUp = () => {
			makeWindCalm();
			removeEventListener("mouseup", handleUp);
		};

		addEventListener("mouseup", handleUp);
	}, [makeWindStrong, makeWindCalm]);

	// Keyboard keys global handlers
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === " ") {
				e.preventDefault();
				e.stopPropagation();
				makeWindStrong();
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === " ") {
				e.preventDefault();
				e.stopPropagation();
				makeWindCalm();
			}
		};

		addEventListener("keydown", handleKeyDown);
		addEventListener("keyup", handleKeyUp);

		return () => {
			removeEventListener("keydown", handleKeyDown);
			removeEventListener("keyup", handleKeyUp);
		};
	}, [makeWindStrong, makeWindCalm]);

	return (
		<button className={styles.host} onMouseDown={handleDown} type="button">
			<div className={styles.key}>space</div>
			<div className={styles.description}>for action</div>
		</button>
	);
}
