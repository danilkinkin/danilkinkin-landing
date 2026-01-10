import { create } from "zustand";

type WindState = {
	strength: number;
	setStrength: (s: number) => void;
};

export const useWind = create<WindState>((set) => ({
	strength: 5,
	setStrength: (strength) => set({ strength }),
}));
