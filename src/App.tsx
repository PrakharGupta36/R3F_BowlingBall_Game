import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas shadows>
        <fog color={"#000000"} near={15} far={20} attach={"fog"} />
        <color attach={"background"} args={["#000000"]} />
        <Scene />
      </Canvas>
    </Suspense>
  );
}
