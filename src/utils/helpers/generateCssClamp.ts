/**
 * Генерирует CSS font-size с clamp() для плавной типографики между двумя ширинами экрана.
 *
 * Вход:
 * - Wmin, Wmax: минимальная и максимальная ширина вьюпорта (px)
 * - Smin, Smax: минимальный и максимальный размер шрифта (px)
 * - options:
 *    - useRemBase: если true, формула во "fluid" части будет начинаться с 1rem (по умолчанию true)
 *    - remPx: значение 1rem в пикселях для расчёта смещения (по умолчанию 16)
 *    - precision: округление коэффициентов (по умолчанию 4 знака)
 *
 * Возвращает объект:
 * {
 *   css: 'font-size: clamp(...);',
 *   parts: { min, fluid, max },         // строки компонентов
 *   numbers: { k_vw, base_px, offset }, // численные параметры
 * }
 *
 * Формулы:
 * k_vw(vw) = (Smax − Smin) / (Wmax − Wmin) * 100
 * base_px  = Smin − (k_vw/100) * Wmin
 * Если useRemBase:
 *   fluid = `1rem + ${k_vw}vw ${offset>=0?'+':'-'} ${|offset|}px`
 *   где offset = base_px − remPx
 * Иначе:
 *   fluid = `${base_px}px + ${k_vw}vw`
 */
export default function generateFluidFont(
	Smin,
	Smax,
	Wmin = 500,
	Wmax = 1500,
	options = {},
) {
	const { useRemBase = true, remPx = 16, precision = 4 } = options;

	if (Wmin >= Wmax) {
		throw new Error("Wmin должен быть меньше Wmax");
	}
	if (Smin >= Smax) {
		throw new Error("Smin должен быть меньше Smax");
	}

	// Коэффициент наклона в vw
	const k_vw = ((Smax - Smin) / (Wmax - Wmin)) * 100;
	// База в пикселях (свободный член)
	const base_px = Smin - (k_vw / 100) * Wmin;

	// Округление
	const round = (n) => Number(n.toFixed(precision));
	const k_vw_r = round(k_vw);
	const base_px_r = round(base_px);

	let fluid, offset, min, max;

	min = `${round(Smin)}px`;
	max = `${round(Smax)}px`;

	if (useRemBase) {
		offset = round(base_px_r - remPx);
		const sign = offset >= 0 ? "+" : "-";
		const absOffset = Math.abs(offset);
		// Если смещение 0, не добавляем "+ 0px"
		fluid =
			absOffset === 0
				? `1rem + ${k_vw_r}vw`
				: `1rem + ${k_vw_r}vw ${sign} ${absOffset}px`;
	} else {
		fluid = `${base_px_r}px + ${k_vw_r}vw`;
		offset = round(0);
	}

	const css = `font-size: clamp(${min}, ${fluid}, ${max});`;

	return {
		css,
		parts: { min, fluid, max },
		numbers: { k_vw: k_vw_r, base_px: base_px_r, offset },
	};
}
