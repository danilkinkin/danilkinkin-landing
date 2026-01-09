import { create } from "zustand";

type Viewport = { x: number; y: number; w: number; h: number };

type MainViewState = {
	forestView: Viewport;
	chemneyView: Viewport;
	houseView: Viewport;
	setViewports: (forest: Viewport, chemney: Viewport, house: Viewport) => void;
};

export const useMainView = create<MainViewState>((set) => ({
	forestView: {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	chemneyView: {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	houseView: {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	setViewports: (forest, house, chemney) => {
		set({ forestView: forest, houseView: house, chemneyView: chemney });
	},
}));
