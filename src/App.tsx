import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

// Add sounds for ball and pins, make some UI to throw the ball

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas camera={{ position: [0, 2, 14] }} shadows>
        <fog color={"#101010"} near={5} far={50} attach={"fog"} />
        {/* Adjust near and far */}
        <color attach={"background"} args={["#000000"]} />
        <Scene />
        {/* <OrbitControls  /> */}
      </Canvas>
    </Suspense>
  );
}
