import { Navigation } from "@components/navigation/Navigation.tsx";

import styles from "./Contacts.module.css";

export function Contacts() {
	return (
		<section className={styles.host} id="contacts">
			<div>
				<Navigation current="contacts" />
			</div>
		</section>
	);
}
