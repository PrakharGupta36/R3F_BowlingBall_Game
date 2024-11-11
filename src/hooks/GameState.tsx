import { create } from "zustand";

interface GameStateProps {
  clicked: boolean;
  setClicked: (value: boolean) => void;
  direction: number;
  setDirection: (value: number) => void;
  strength: number;
  setStrength: (value: number) => void;

  score: number;
  setScore: (value: number) => void;
  booleans: {
    isDirection: boolean;
    isStrength: boolean;
    isThrow: boolean;
  };
  setBooleans: (name: string, value: boolean) => void;
  isIntroCompleted: boolean;
  setIsIntroCompleted: (value: boolean) => void;
}

export const GameState = create<GameStateProps>((set) => ({
  isIntroCompleted: false,
  setIsIntroCompleted: (value: boolean) =>
    set(() => ({ isIntroCompleted: value })),
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
