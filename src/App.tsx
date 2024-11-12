import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import "./css/overlay.css";
import Button from "./components/ui/Button";
import { GameState } from "./hooks/GameState";
import { motion, AnimatePresence } from "framer-motion";
// import { OrbitControls} from "@react-three/drei";

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
          <Canvas shadows>
            {isIntroCompleted && <Scene />}
            {/* <OrbitControls /> */}
          </Canvas>
        </Suspense>
      </motion.div>
    </>
  );
}
