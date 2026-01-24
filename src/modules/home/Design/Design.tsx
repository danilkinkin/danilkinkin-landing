// @ts-types="react"
import {
	// @ts-types="react"
	useEffect,
	// @ts-types="react"
	useLayoutEffect,
	useState,
} from "react";
import { useWordInRow } from "../SharedRow/SharedRow.tsx";
import Variant_1 from "./variants/1.svg?react";
import Variant_2 from "./variants/2.svg?react";
import Variant_3 from "./variants/3.svg?react";
import Variant_4 from "./variants/4.svg?react";
import Variant_5 from "./variants/5.svg?react";
import Variant_6 from "./variants/6.svg?react";
import Variant_7 from "./variants/7.svg?react";
import Variant_8 from "./variants/8.svg?react";
import Variant_10 from "./variants/10.svg?react";
import Variant_11 from "./variants/11.svg?react";
import Variant_12 from "./variants/12.svg?react";
import Variant_13 from "./variants/13.svg?react";
import Variant_14 from "./variants/14.svg?react";
import Variant_15 from "./variants/15.svg?react";
import Variant_16 from "./variants/16.svg?react";
import Variant_17 from "./variants/17.svg?react";
import Variant_18 from "./variants/18.svg?react";
import Variant_19 from "./variants/19.svg?react";

import styles from "./Design.module.css";

const variants = [
	Variant_1,
	Variant_2,
	Variant_3,
	Variant_4,
	Variant_5,
	Variant_6,
	Variant_7,
	Variant_8,
	Variant_10,
	Variant_11,
	Variant_12,
	Variant_13,
	Variant_14,
	Variant_15,
	Variant_16,
	Variant_17,
	Variant_18,
	Variant_19,
];

export function Design() {
	const [ref, updateSize] = useWordInRow("design", {
		softWidth: true,
	});
	const [curr, setCurr] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setCurr((index) => (index + 1) % variants.length);
		}, 350);

		return () => clearInterval(id);
	}, []);

	useLayoutEffect(() => {
		if (!ref.current) return;

		updateSize(ref.current.getBoundingClientRect().width);
	}, [curr, updateSize]);

	const Variant = variants[curr];

	return (
		<span className={styles.host} ref={ref}>
			<Variant />,
		</span>
	);
}
