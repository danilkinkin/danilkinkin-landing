import { LinkArrowIcon } from "@assets/icons";
import { Navigation } from "@components/navigation/Navigation.tsx";
import { Link } from "wouter";

import styles from "./Contacts.module.css";

type ExternalLinkProps = {
	children: React.ReactNode;
	href: string;
};

function ExternalLink(props: ExternalLinkProps) {
	const { href, children } = props;

	return (
		<Link
			className={styles.externalLink}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{children}
			<LinkArrowIcon className={styles.arrowIcon} />
		</Link>
	);
}

export function Contacts() {
	return (
		<section className={styles.host} id="contacts">
			<div className={styles.aside}>
				<div className={styles.canvas} />
				<div className={styles.navigation}>
					<Navigation current="contacts" />
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.emailBlock}>
					<p>
						Do you have a question about my projects? Want to work with me? Feel
						free to write
					</p>
					<a href="mailto:hello@danilkinkin.com">hello@danilkinkin.com</a>
				</div>
				<div className={styles.linksSection}>
					<div className={styles.linksBlock}>
						<h3>contacts</h3>
						<ExternalLink href="https://t.me/danilkinkin">
							telegram
						</ExternalLink>
						<ExternalLink href="https://github.com/danilkinkin">
							github
						</ExternalLink>
						<ExternalLink href="https://www.linkedin.com/in/danilkinkin">
							linkedin
						</ExternalLink>
						<ExternalLink href="https://unsplash.com/@danilkinkin">
							unsplash
						</ExternalLink>
					</div>
					<div className={styles.linksBlock}>
						<h3>resume</h3>
						<ExternalLink href="https://danilkinkin.com/cv">
							ATS Friendly
						</ExternalLink>
						<ExternalLink href="https://danilkinkin.com/cv-shiny">
							✨Styled✨
						</ExternalLink>
					</div>
				</div>
			</div>
		</section>
	);
}
