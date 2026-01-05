import { MetaData } from "./MetaData.tsx";
import { MinimalHead } from "./MinimalHead.tsx";

type SSRHeadProps = {
	criticalCSS?: string;
};

// <head> content. Genetated only on server side.
export function SSRHead(props: SSRHeadProps) {
	const { criticalCSS } = props;

	if (!import.meta.env.SSR) {
		throw new Error("SSRHead should be used only on server side");
	}

	return (
		<>
			<MinimalHead />
			<MetaData />

			{/* Critical CSS */}
			{criticalCSS && (
				<style
					dangerouslySetInnerHTML={{ __html: criticalCSS }}
					/* biome-ignore lint/security/noDangerouslySetInnerHtml: Inject safe data. Only from server */
					id="critical-css"
				/>
			)}

			{/* Preload chunks */}
			<link
				as="font"
				crossOrigin=""
				href={`${import.meta.env.BASE_URL}fonts/onest-wght.ttf`}
				rel="preload"
				type="font/ttf"
			/>
		</>
	);
}
