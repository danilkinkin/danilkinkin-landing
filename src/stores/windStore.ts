import { create } from "zustand";

type WindState = {
	strength: number;
	setStrength: (s: number) => void;
};

export const useWind = create<WindState>((set) => ({
	strength: 0,
	setStrength: (strength) => set({ strength }),
}));
