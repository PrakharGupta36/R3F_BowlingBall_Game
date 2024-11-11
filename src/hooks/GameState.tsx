import { create } from "zustand";

interface GameStateProps {
  clicked: boolean;
  setClicked: (value: boolean) => void;
  direction: number;
  strength: number;
  score: number;
  booleans: {
    isDirection: boolean;
    isStrength: boolean;
    isThrow: boolean;
  };
  setBooleans: (name: string, value: boolean) => void;
  setDirection: (value: number) => void;
  setStrength: (value: number) => void;
  setScore: (value: number) => void;
}

export const GameState = create<GameStateProps>((set) => ({
  booleans: {
    isStrength: false,
    isDirection: false,
    isThrow: false,
  },
  setBooleans: (name: string, value: boolean) =>
    set((state) => ({
      booleans: {
        ...state.booleans,
        [name]: value,
      },
    })),
  direction: 0,
  strength: 0,
  score: 0,
  clicked: false,
  setDirection: (value: number) => set(() => ({ direction: value })),
  setStrength: (value: number) => set(() => ({ strength: value })),
  setClicked: (value: boolean) => set({ clicked: value }),
  setScore: (value: number) => set({ score: value }),
}));
