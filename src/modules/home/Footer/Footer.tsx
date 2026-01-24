import { Navigation } from "@components/navigation/Navigation.tsx";
import { useMainView } from "@stores/mainView.ts";
import { InteractionWithWorld } from "../InteractionWithWorld/InteractionWithWorld.tsx";

import styles from "./Footer.module.css";

export function Footer() {
	const forestViewportWidth = useMainView((s) => s.forestView.w);
	const houseViewportWidth = useMainView((s) => s.houseView.w);
	const chemneyViewportWidth = useMainView((s) => s.chemneyView.w);

	return (
		<div className={styles.host}>
			<div style={{ width: forestViewportWidth }}>
				<Navigation current="home" />
			</div>
			<div
				className={styles.houseViewport}
				style={{ width: houseViewportWidth }}
			>
				<InteractionWithWorld />
			</div>
			<div style={{ width: chemneyViewportWidth }} />
		</div>
	);
}
