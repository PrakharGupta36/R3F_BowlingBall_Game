import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { Suspense, useState, useCallback, memo } from "react";
import { Loader } from "@react-three/drei";
import "./css/overlay.css";
import { GameState } from "./hooks/GameState";
import { motion, AnimatePresence } from "framer-motion";
import Overlay from "./components/Overlay";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import GameOver from "./components/GameOver";
import TimeTracker from "./utils/TimeTracker";

const OverlayComponent = memo(() => (
  /* Intro Overlay */
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='overlay'
    >
      <Overlay />
    </motion.div>
  </AnimatePresence>
));

const CanvasComponent = memo(
  /* Canvas shows up when intro is completed */
  ({ isIntroCompleted }: { isIntroCompleted: boolean }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isIntroCompleted ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={1}
          gl={{
            antialias: true,
            stencil: false,
            depth: true,
            powerPreference: "high-performance",
          }}
        >
          {isIntroCompleted && <Scene />}
        </Canvas>
      </Suspense>
    </motion.div>
  )
);

export default function App(): JSX.Element {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const { width, height } = useWindowSize();

  // I'm getting an infinite loop error whenever I destructure variables from GameState, not gonna solve it, just calling them individually
  const isIntroCompleted = GameState((state) => state.isIntroCompleted);
  const allPinsDown = GameState((set) => set.allPinsDown);

  const handleTimeChange = useCallback((min: number, sec: number): void => {
    setMinutes(min);
    setSeconds(sec);
  }, []);

  return (
    <>
      <TimeTracker onTimeChange={handleTimeChange} />
      {allPinsDown ? (
        <>
          <GameOver minutes={minutes} seconds={seconds} />
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
          />
        </>
      ) : (
        <>
          {!isIntroCompleted ? (
            <OverlayComponent />
          ) : (
            <CanvasComponent isIntroCompleted={isIntroCompleted} />
          )}
        </>
      )}
    </>
  );
}
