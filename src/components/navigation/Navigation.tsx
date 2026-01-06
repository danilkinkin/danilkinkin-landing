import clsx from "clsx/lite";
import { Link } from "wouter";

import styles from "./Navigation.module.css";

type NavigationProps = {
	current: "home" | "about" | "contacts";
};

export function Navigation(props: NavigationProps) {
	const { current } = props;

	return (
		<nav className={styles.host}>
			<ol>
				<li>
					<Link className={clsx(current === "home" && styles.active)} href="/">
						hi
					</Link>
				</li>
				<li>
					<Link
						className={clsx(current === "about" && styles.active)}
						href="/about"
					>
						about & projects
					</Link>
				</li>
				<li>
					<Link
						className={clsx(current === "contacts" && styles.active)}
						href="/contacts"
					>
						contacts
					</Link>
				</li>
			</ol>
		</nav>
	);
}
