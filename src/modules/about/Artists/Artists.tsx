import { animate, splitText, stagger } from "animejs";
import { useCallback, useEffect, useRef } from "react";

import styles from "./Artists.module.css";

export function ArtistSlider() {
	const hostRef = useRef<HTMLSpanElement>(null);
	const artistCurrentRef = useRef<HTMLSpanElement>(null);
	const artistNextRef = useRef<HTMLSpanElement>(null);
	const artists = [
		"Monetochka",
		"Ed Sheeran",
		"Zemfira",
		"Hurts",
		"Imagine Dragons",
	];

	const transformTo = useCallback((from: string, to: string) => {
		const hostEl = hostRef.current;
		const currentEl = artistCurrentRef.current;
		const nextEl = artistNextRef.current;
		if (!(currentEl && nextEl && hostEl)) return;

		currentEl.textContent = from;
		nextEl.textContent = to;

		hostEl.style.height = `${nextEl.clientHeight}px`;
		hostEl.style.width = `${nextEl.clientWidth}px`;

		const { chars: charsCurrent } = splitText(currentEl, {
			chars: { wrap: "visible" },
		});

		animate(charsCurrent, {
			y: {
				from: "0%",
				to: "-20%",
			},
			opacity: {
				from: "1",
				to: "0",
			},
			duration: 250,
			ease: "inOut(3)",
			delay: stagger(50),
		});

		const { chars: charsNext } = splitText(nextEl, {
			chars: { wrap: "visible" },
		});

		animate(charsNext, {
			y: {
				from: "20%",
				to: "0%",
			},
			opacity: {
				from: "0",
				to: "1",
			},
			duration: 250,
			ease: "inOut(3)",
			delay: stagger(50),
		});

		animate(hostEl, {
			width: {
				from: `${currentEl.clientWidth}px`,
				to: `${nextEl.clientWidth}px`,
			},
			height: {
				from: `${currentEl.clientHeight}px`,
				to: `${nextEl.clientHeight}px`,
			},
			duration: 650,
			delay: nextEl.clientWidth < currentEl.clientWidth ? from.length * 50 : 0,
			ease: "inOut(3)",
		});
	}, []);

	useEffect(() => {
		let index = 1;

		transformTo(artists[0], artists[1]);

		const interval = setInterval(() => {
			const currentArtist = artists[index % artists.length];
			const nextArtist = artists[(index + 1) % artists.length];

			index += 1;

			transformTo(currentArtist, nextArtist);
		}, 3000);

		return () => clearInterval(interval);
	}, [transformTo]);

	return (
		<span className={styles.host} ref={hostRef}>
			<span ref={artistCurrentRef}>Monetochka</span>
			<span ref={artistNextRef} />
		</span>
	);
}
