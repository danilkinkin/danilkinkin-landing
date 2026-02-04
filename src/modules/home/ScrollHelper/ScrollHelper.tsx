import styles from "./ScrollHelper.module.css";

const COLS = 3;
const ROWS = 11;

const SPEED = 30;

export function ScrollHelper() {
	return (
		<div className={styles.host}>
			{Array.from({ length: ROWS }).map((_, rowIndex) => (
				<div className={styles.row} key={rowIndex}>
					{Array.from({ length: COLS }).map((_, colIndex) => (
						<div
							className={styles.dot}
							key={colIndex}
							style={
								{
									"--delay": `${rowIndex * SPEED}ms`,
								} as React.CSSProperties
							}
						/>
					))}
				</div>
			))}
		</div>
	);
}
