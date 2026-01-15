import { InlineLink } from "@components/InlineLink/InlineLink.tsx";
import { Navigation } from "@components/navigation/Navigation.tsx";
import BuckwheatLogo from "./buckwheat-logo.svg?react";
import MegaFonLogo from "./megafon-logo.svg?react";
import RigamiLogo from "./rigami-logo.svg?react";
import TicketscloudLogo from "./ticketscloud-logo.svg?react";

import styles from "./About.module.css";

type LogoLinkProps = {
	logo: React.ReactNode;
	href: string;
};

function LogoLink(props: LogoLinkProps) {
	const { logo: Logo, href } = props;
	return (
		<a href={href} target="_blank">
			<Logo className={styles.logo} />
		</a>
	);
}

function ArtistSlider() {
	// Monetochka,Ed Sheeran,Zemfira,Hurts,Imagine Dragons
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
						<LogoLink
							href="https://ticketscloud.com/"
							logo={TicketscloudLogo}
						/>{" "}
						(SaaS ticketing). Managed high-load launches, including{" "}
						<ArtistSlider /> sales.
					</li>
					<li>
						Previously at{" "}
						<LogoLink href="https://www.megafon.ru/" logo={MegaFonLogo} />{" "}
						(Tier-1 telecom) — built a high-load support platform from scratch.
					</li>
					<li>
						Full journey in my{" "}
						<InlineLink
							href="https://danilkinkin.com/cv"
							rel="noopener"
							target="_blank"
						>
							cv
						</InlineLink>{" "}
					</li>
				</ol>
			</div>
			<div className={styles.block}>
				<h3>PROJECTS</h3>
				<ol>
					<li>
						<LogoLink href="https://buckwheat.app/" logo={BuckwheatLogo} /> —{" "}
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
						<LogoLink href="" logo={RigamiLogo} /> — Cross-browser extension for
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
