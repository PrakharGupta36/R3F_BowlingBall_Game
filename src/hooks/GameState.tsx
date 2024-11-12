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

  pinsData: {
    name: string;
    position: [number, number, number];
    rotation: [number, number, number];
    id: number;
    isFallen: boolean;
  }[];

  setPinsData: (
    id: number,

  ) => void;
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
  setDirection: (value: number) => set(() => ({ direction: value })),

  strength: 0,
  setStrength: (value: number) => set(() => ({ strength: value })),

  clicked: false,
  setClicked: (value: boolean) => set({ clicked: value }),

  score: 0,
  setScore: (value: number) => set({ score: value }),

  pinsData: [
    {
      name: "#TOY0003_V2_Pin001_#TOY0003_V2_Textures_0",
      position: [0, 0.124, 0.719],
      rotation: [-Math.PI / 2, 0, 0],
      id: 1,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin002_#TOY0003_V2_Textures_0",
      position: [-0.15, 0.124, 0.419],
      rotation: [-Math.PI / 2, 0, 0],
      id: 2,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin003_#TOY0003_V2_Textures_0",
      position: [0.15, 0.124, 0.419],
      rotation: [-Math.PI / 2, 0, 0],
      id: 3,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin004_#TOY0003_V2_Textures_0",
      position: [-0.3, 0.124, 0.12],
      rotation: [-Math.PI / 2, 0, 0],
      id: 4,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin005_#TOY0003_V2_Textures_0",
      position: [0, 0.124, 0.12],
      rotation: [-Math.PI / 2, 0, 0],
      id: 5,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin006_#TOY0003_V2_Textures_0",
      position: [0.3, 0.124, 0.12],
      rotation: [-Math.PI / 2, 0, 0],
      id: 6,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin007_#TOY0003_V2_Textures_0",
      position: [-0.449, 0.124, -0.18],
      rotation: [-Math.PI / 2, 0, 0],
      id: 7,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin008_#TOY0003_V2_Textures_0",
      position: [-0.15, 0.124, -0.18],
      rotation: [-Math.PI / 2, 0, 0],
      id: 8,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin009_#TOY0003_V2_Textures_0",
      position: [0.15, 0.124, -0.18],
      rotation: [-Math.PI / 2, 0, 0],
      id: 9,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin010_#TOY0003_V2_Textures_0",
      position: [0.449, 0.124, -0.18],
      rotation: [-Math.PI / 2, 0, 0],
      id: 10,
      isFallen: false,
    },
  ],

  setPinsData: (id: number) =>
    set((state) => ({
      pinsData: state.pinsData.filter((pin) => pin.id !== id),
    })),
}));
