import clsx from "clsx/lite";
import { Capsule } from "../Capsule/Capsule.tsx";
import { Design } from "../Design/Design.tsx";
import { Etical } from "../Etical/Etical.tsx";
import { SharedRow } from "../SharedRow/SharedRow.tsx";
import { Spring } from "../Spring/Spring.tsx";
import { Word as W } from "../Word/Word.tsx";

import styles from "./AnimatedMainText.module.css";

type AnimatedMainTextProps = {
	compact?: boolean;
};

export function AnimatedMainText(props: AnimatedMainTextProps) {
	const { compact } = props;

	if (compact) {
		return (
			<p className={clsx(styles.host, styles.compact)}>
				<SharedRow>
					<W>Work</W>
					<W>only</W>
					<Etical />
				</SharedRow>
				<SharedRow>
					<W>products.</W>
					<W>Into</W>
					<Spring />
					<W>code,</W>
					<W>clean</W>
				</SharedRow>
				<SharedRow>
					<Design />
					<W>and</W>
					<W>crafting</W>
					<W>stuff</W>
					<W>that</W>
				</SharedRow>
				<SharedRow>
					<W>feels</W>
					<Capsule />
					<W>right</W>
				</SharedRow>
			</p>
		);
	}

	return (
		<p className={styles.host}>
			<SharedRow>
				<W>Work</W>
				<W>only</W>
				<Etical />
				<W>products.</W>
			</SharedRow>
			<SharedRow>
				<W>Into</W>
				<Spring />
				<W>code,</W>
				<W>clean</W>
				<Design />
				<W>and</W>
				<W>crafting</W>
			</SharedRow>
			<SharedRow>
				<W>stuff</W>
				<W>that</W>
				<W>feels</W>
				<Capsule />
				<W>right</W>
			</SharedRow>
		</p>
	);
}
