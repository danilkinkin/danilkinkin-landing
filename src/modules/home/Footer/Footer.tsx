import { Navigation } from "@components/navigation/Navigation.tsx";
import { useMainView } from "@stores/mainView.ts";
import { InteractionWithWorld } from "../InteractionWithWorld/InteractionWithWorld.tsx";
import { ScrollHelper } from "../ScrollHelper/ScrollHelper.tsx";
import { VIEWPORT_GAP } from "../useViewportConfig.tsx";

import styles from "./Footer.module.css";

export function Footer() {
	const forestViewportWidth = useMainView((s) => s.forestView.w);
	const houseViewportWidth = useMainView((s) => s.houseView.w);
	const chemneyViewportWidth = useMainView((s) => s.chemneyView.w);

	return (
		<div className={styles.host}>
			<Navigation current="home" />
			<div
				className={styles.houseViewport}
				style={{
					right: VIEWPORT_GAP + chemneyViewportWidth,
				}}
			>
				<InteractionWithWorld />
			</div>

			<div className={styles.chemneyViewport}>
				<ScrollHelper />
			</div>
		</div>
	);
}
