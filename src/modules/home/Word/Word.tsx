import { useWordInRow } from "../SharedRow/SharedRow.tsx";

import styles from "./Word.module.css";

type WordProps = {
	id?: string;
	children: React.ReactNode;
};

export function Word(props: WordProps) {
	const [ref, updateSize] = useWordInRow(props.id);

	return (
		<span className={styles.host} ref={ref}>
			{props.children}
		</span>
	);
}
