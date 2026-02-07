import { useFrame } from "@utils/anim/useFrame.ts";
import {
	createContext,
	type Ref,
	// @ts-types="react"
	type RefObject,
	useCallback,
	useContext,
	useEffect,
	useId,
	// @ts-types="react"
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import styles from "./SharedRow.module.css";

type Options = {
	freeGrowWeight?: number;
	softWidth?: boolean;
};

type SharedRowContextValue = {
	register: (
		id: string,
		ref: RefObject<HTMLSpanElement>,
		options?: Options,
	) => void;
	unregister: (id: string) => void;
	updateSize: (id: string, width: number) => void;
	getSize: (id: string) => DOMRect;
};

const SharedRowContext = createContext<SharedRowContextValue | undefined>(
	undefined,
);

export function useWordInRow(rewriteId?: string, options?: Options) {
	const ctx = useContext(SharedRowContext);
	const ref = useRef<HTMLSpanElement>(null);
	const unicId = useId();
	const id = rewriteId || unicId;

	if (!ctx) {
		throw new Error("useWordInRow must be used within a SharedRow");
	}

	useLayoutEffect(() => {
		ctx.register(id, ref, options);

		return () => {
			ctx.unregister(id);
		};
	}, [id, ctx]);

	const updateSize = useCallback(
		(width: number) => {
			ctx.updateSize(id, width);
		},
		[id, ctx],
	);

	return [ref, updateSize];
}

export function useSharedRow() {
	const ctx = useContext(SharedRowContext);

	if (!ctx) {
		throw new Error("useSharedRow must be used within a SharedRow");
	}
	return ctx;
}

type SharedRowProps = {
	children: React.ReactNode;
};

export function SharedRow(props: SharedRowProps) {
	const { children } = props;
	const hostRef = useRef<HTMLDivElement>(null);
	const state = useRef<{
		order: string[];
		refs: { [id: string]: RefObject<HTMLSpanElement> };
		options: { [id: string]: Options };
		domRects: { [id: string]: DOMRect };
		current: {
			[id: string]: {
				top: number;
				left: number;
				height: number;
				width: number;
			};
		};
		target: {
			[id: string]: {
				top: number;
				left: number;
				height: number;
				width: number;
			};
		};
		maxHeight: number;
	}>({
		order: [],
		refs: {},
		options: {},
		domRects: {},
		current: {},
		target: {},
		maxHeight: 0,
	});

	const MIN_GAP = 16;

	const calcTargetPositions = () => {
		const hostEl = hostRef.current;

		if (!hostEl) return;

		const cs = state.current;
		const items = cs.order;
		let occupied = 0;
		let gap = 0;
		let requireToShare = 0;
		let widths = items.map((id) => {
			if ((cs.options[id].freeGrowWeight || 1) === 1) {
				occupied += cs.domRects[id].width;
				return cs.domRects[id].width;
			}

			requireToShare += 1;
			return id;
		});
		const fullWidth = hostEl.clientWidth;
		if (requireToShare !== 0) {
			gap = MIN_GAP;
			let shared = fullWidth - occupied - MIN_GAP * (items.length - 1);
			const sharedPer = shared / requireToShare;
			widths = widths.map((width) => {
				if (typeof width !== "string") return width;

				if (cs.options[width].freeGrowWeight <= 1) {
					const w = sharedPer * (cs.options[width].freeGrowWeight || 1);

					shared -= w;

					return w;
				}

				return width;
			});

			widths = widths.map((width) => {
				if (typeof width !== "string") return width;

				if (cs.options[width].freeGrowWeight > 1) {
					const w = sharedPer;

					shared -= sharedPer;

					return w;
				}

				return width;
			});

			gap = MIN_GAP + shared / (items.length - 1);
		} else {
			gap = (fullWidth - occupied) / (items.length - 1);
		}
		let left = 0;
		let maxHeight = 0;

		cs.order.forEach((id, index) => {
			cs.target[id] = {
				top: 0,
				height: cs.domRects[id].height,
				left,
				width: widths[index],
			};

			left += cs.target[id].width + gap;
			maxHeight = Math.max(maxHeight, cs.target[id].height);
		});

		cs.maxHeight = maxHeight;

		hostEl.style.height = maxHeight + "px";
	};

	const register = useCallback(
		(id: string, ref: RefObject<HTMLSpanElement>, options?: Options) => {
			state.current.order.push(id);
			state.current.refs[id] = ref;
			state.current.options[id] = options || {};
			state.current.domRects[id] = ref.current.getBoundingClientRect();
			state.current.current[id] = {
				top: 0,
				left: 0,
				height: 0,
				width: 0,
			};
			state.current.target[id] = {
				top: 0,
				left: 0,
				height: 0,
				width: 0,
			};
		},
		[],
	);
	const unregister = useCallback((id: string) => {
		state.current.order = state.current.order.filter((cId) => cId !== id);
		delete state.current.refs[id];
	}, []);

	const updateSize = useCallback((id: string, width: number) => {
		state.current.domRects[id] =
			state.current.refs[id].current.getBoundingClientRect();

		state.current.domRects[id].width = width;

		calcTargetPositions();
	}, []);

	const getSize = useCallback((id: string) => {
		return state.current.current[id];
	}, []);

	useFrame(() => {
		const hostEl = hostRef.current;

		if (!hostEl) return;

		state.current.order.forEach((id) => {
			const cs = state.current;

			cs.current[id] = {
				left:
					cs.current[id].left +
					(cs.target[id].left - cs.current[id].left) * 0.1,
				top: cs.target[id].top,
				width:
					cs.current[id].width +
					(cs.target[id].width - cs.current[id].width) * 0.1,
				height: cs.target[id].height,
			};

			if (cs.options[id].softWidth) {
				cs.refs[id].current.style.left =
					cs.current[id].left -
					(cs.target[id].width - cs.current[id].width) / 2 +
					"px";
			} else {
				cs.refs[id].current.style.left = cs.current[id].left + "px";
			}
			cs.refs[id].current.style.top =
				(cs.maxHeight - cs.current[id].height) / 2 + "px";
		});
	});

	useEffect(() => {
		calcTargetPositions();

		const hostEl = hostRef.current;
		if (!hostEl) return;

		const ro = new ResizeObserver(() => {
			// On host resize, recompute target positions for all items
			calcTargetPositions();
		});

		ro.observe(hostEl);

		return () => {
			ro.disconnect();
		};
	}, []);

	const value = useMemo(
		() => ({
			register,
			unregister,
			updateSize,
			getSize,
		}),
		[register, unregister, updateSize],
	);

	return (
		<SharedRowContext.Provider value={value}>
			<div className={styles.host} ref={hostRef}>
				{children}
			</div>
		</SharedRowContext.Provider>
	);
}
