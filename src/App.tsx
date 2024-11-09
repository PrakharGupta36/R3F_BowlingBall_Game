import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas shadows dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </Suspense>
  );
}
