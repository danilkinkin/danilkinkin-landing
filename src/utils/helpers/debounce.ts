// biome-ignore lint/suspicious/noExplicitAny: We can apply any type here, because we don't know the type of the function
export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
	skipLeadingCall = false,
): T {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	// biome-ignore lint/suspicious/noExplicitAny: We can apply any type here, because we don't know the type of the function
	return function (this: any, ...args: Parameters<T>): void {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
		if (!(timeoutId || skipLeadingCall)) {
			fn.apply(this, args);
		}

		timeoutId = setTimeout(() => {
			fn.apply(this, args);
			timeoutId = null;
		}, delay);
	} as unknown as T;
}
