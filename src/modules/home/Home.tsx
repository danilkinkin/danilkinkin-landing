import { Navigation } from "@components/navigation/Navigation.tsx";

import styles from "./Home.module.css";

export function Home() {
	return (
		<section className={styles.host} id="home">
			<div />
			<div>
				<Navigation current="home" />
			</div>
		</section>
	);
}
