import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import "./css/overlay.css";
import Button from "./components/ui/Button";
import { GameState } from "./hooks/GameState";
import { motion, AnimatePresence } from "framer-motion";

import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

function Overlay() {
  const setIsIntroCompleted = GameState((state) => state.setIsIntroCompleted);
  return (
    <div className='overlay_container'>
      <div className='overlay_container_inner'>
        <h1>R3F Bowling Ball Game</h1>
        <Button
          onClick={() => setIsIntroCompleted(true)}
          text='Enter'
          addedClassName=''
          disabled={false}
        />
      </div>
    </div>
  );
}

function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.4} height={1000} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.05} darkness={1.1} />
    </EffectComposer>
  );
}

export default function App() {
  const isIntroCompleted = GameState((state) => state.isIntroCompleted);

  return (
    <>
      <AnimatePresence>
        {!isIntroCompleted && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='overlay'
          >
            <Overlay />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroCompleted ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ height: "100vh", width: "100vw" }}
      >
        <Suspense fallback={<Loader />}>
          <Canvas
            shadows
            dpr={2}
            gl={{
              antialias: false,
              stencil: false,
              depth: true,
              powerPreference: "high-performance",
            }}
          >
            <PostProcessing />
            {isIntroCompleted && <Scene />}
          </Canvas>
        </Suspense>
      </motion.div>
    </>
  );
}
