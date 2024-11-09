import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { BrightnessContrast, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas  shadows>
        <Perf position='top-left' />
        <Scene />
        <EffectComposer>
          <Noise opacity={0.1} />
          <BrightnessContrast
            brightness={0} // brightness. min: -1, max: 1
            contrast={0} // contrast: min -1, max: 1
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}
