import { InlineLink } from "@components/InlineLink/InlineLink.tsx";
import { Navigation } from "@components/navigation/Navigation.tsx";
import BuckwheatLogo from "./buckwheat-logo.svg?react";
import MegaFonLogo from "./megafon-logo.svg?react";
import RigamiLogo from "./rigami-logo.svg?react";
import TicketscloudLogo from "./ticketscloud-logo.svg?react";

import styles from "./About.module.css";

function ArtistSlider() {
	return <span className={styles.artistSlider}>Monetochka</span>;
}

export function About() {
	return (
		<section className={styles.host} id="about">
			<div className={styles.block}>
				<h3>WORK EXPERIENCE</h3>
				<ol>
					<li>
						Currently leading frontend at{" "}
						<TicketscloudLogo className={styles.logo} /> (SaaS ticketing).
						Managed high-load launches, including <ArtistSlider /> sales.
					</li>
					<li>
						Previously at <MegaFonLogo className={styles.logo} /> (Tier-1
						telecom) — built a high-load support platform from scratch.
					</li>
					<li>
						Full journey in my{" "}
						<InlineLink
							href="https://github.com/danilkinkin/buckwheat"
							rel="noopener"
							target="_blank"
						>
							cv
						</InlineLink>
					</li>
				</ol>
			</div>
			<div className={styles.block}>
				<h3>PROJECTS</h3>
				<ol>
					<li>
						<BuckwheatLogo className={styles.logo} /> —{" "}
						<InlineLink
							href="https://github.com/danilkinkin/buckwheat"
							rel="noopener"
							target="_blank"
						>
							Open-source
						</InlineLink>{" "}
						Android app, built solo. 700+ GitHub stars, ethical & ad-free
					</li>
					<li>
						<RigamiLogo className={styles.logo} /> — Cross-browser extension for
						notes & bookmarks
					</li>
				</ol>
			</div>
			<div className={styles.navigation}>
				<Navigation current="about" />
			</div>
			<div aria-hidden="true" className={styles.endMarker} />
		</section>
	);
}
