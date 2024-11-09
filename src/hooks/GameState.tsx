import { create } from "zustand";

interface GameStateProps {
  clicked: boolean;
  setClicked: () => void;
  direction: number;
  strength: number;
  booleans: {
    isDirection: boolean;
    isStrength: boolean;
    isThrow: boolean;
  };
  setBooleans: (name: string, value: boolean) => void;
  setDirection: (value: number) => void;
  setStrength: (value: number) => void;
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
  clicked: false,
  setDirection: (value: number) => set(() => ({ direction: value })),
  setStrength: (value: number) => set(() => ({ strength: value })),
  setClicked: () => set({ clicked: true }),
}));
