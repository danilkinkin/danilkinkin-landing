import { useMediaQuery } from "@utils/helpers/useMediaQuery.tsx";
import clsx from "clsx/lite";
import { Link } from "wouter";

import styles from "./Navigation.module.css";

type NavigationProps = {
	current: "home" | "about" | "contacts";
	viewportRef?: React.RefObject<HTMLDivElement>;
};

export function Navigation(props: NavigationProps) {
	const { current, viewportRef } = props;
	const isNarrowScreen = useMediaQuery("(max-width: 740px)");

	return (
		<nav className={clsx(styles.host, isNarrowScreen && styles.narrow)}>
			{isNarrowScreen && <div className={styles.artwork} ref={viewportRef} />}
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
