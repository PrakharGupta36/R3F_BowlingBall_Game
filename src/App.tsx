import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import { Suspense, useState, useCallback, memo, useEffect } from "react";
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
          dpr={2}
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
  const [BGM] = useState(() => {
    const audio = new Audio("/sounds/BGM.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.1;
    return audio;
  });

  const isIntroCompleted = GameState((state) => state.isIntroCompleted);
  const allPinsDown = GameState((state) => state.allPinsDown);
  const music = GameState((state) => state.music);

  const handleTimeChange = useCallback((min: number, sec: number): void => {
    setMinutes(min);
    setSeconds(sec);
  }, []);

  useEffect(() => {
    if (isIntroCompleted && music) {
      const playAudio = () => {
        BGM.play().catch(() => {
          console.warn("Autoplay blocked. Waiting for user interaction...");
          // Retry on user interaction
          const enableAudio = () => {
            BGM.play().catch((error) =>
              console.error("Failed to play audio after interaction:", error)
            );
            document.removeEventListener("click", enableAudio);
          };
          document.addEventListener("click", enableAudio);
        });
      };

      playAudio();
    }

    return () => {
      BGM.pause(); // Stop audio when component unmounts
    };
  }, [BGM, isIntroCompleted, music]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isIntroCompleted) {
        BGM.play().catch((err) =>
          console.error("Failed to resume audio on visibility change:", err)
        );
      } else {
        BGM.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [BGM, isIntroCompleted]);

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
