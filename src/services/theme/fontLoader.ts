const onsetFont = new FontFace(
	"Onest",
	`url('${import.meta.env.BASE_URL}fonts/onest-wght.ttf') format('truetype')`,
	{
		weight: "1 900",
		style: "normal",
		display: "swap",
	},
);

/**
 * Preload fonts for preventing FOUT. So we load font before app render, during loader screen.
 */
export async function loadFonts() {
	return onsetFont
		.load()
		.then((loadedFont) => {
			document.fonts.add(loadedFont);
		})
		.catch((error) => {
			console.warn("Font loading failed:", error);
		});
}
