import { Physics, RapierRigidBody } from "@react-three/rapier";
import Ball from "./Ball";
import Floor from "./Floor";
import Lights from "./Lights";
import { Pins } from "./Pins";
import { useEffect, useRef, useState } from "react";
import { Html, PerspectiveCamera } from "@react-three/drei";
import GUI from "./GUI/GUI";
import * as THREE from "three";
import { GameState } from "../hooks/GameState";
import Walls from "./Walls";
import "../css/reset.css";
import Button from "./ui/Button";

export default function Scene() {
  const ballRef = useRef<RapierRigidBody>(null!);
  const ballMeshRef = useRef<THREE.Mesh>(null!);
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  const clicked = GameState((state) => state.clicked);
  const [showRestart, setShowRestart] = useState<boolean>(false);

  useEffect(() => {
    if (clicked) {
      setShowRestart(true);
    }
  }, [clicked]);

  function RestartInfo() {
    const setBallResetTime = GameState((state) => state.setBallResetTime);
    const ballResetTime = GameState((state) => state.ballResetTime);
    const [count, setCount] = useState(ballResetTime);
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      console.log({ countInfo: count });
    }, [count]);

    useEffect(() => {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [ballResetTime]);

    const handleWaitMore = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      setCount((prev) => prev + 10);
      setBallResetTime(count);

      timerRef.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    };

    return (
      <div className='reset_info'>
        <h1> Restarting in {count} sec </h1>
        <Button
          disabled={count > 10}
          onClick={handleWaitMore}
          text={"Wait 10 seconds more"}
          addedClassName={"reset_btn"}
        />
      </div>
    );
  }

  return (
    <>
      <PerspectiveCamera position={[0, -1, -15]} ref={camera} fov={75}>
        <Lights />
        <Physics gravity={[0, -9.8, 0]}>
          <Pins />
          <Ball ballRef={ballRef} ballMeshRef={ballMeshRef} />
          <Floor />
          <Walls />
        </Physics>
        <Html>{clicked ? showRestart && <RestartInfo /> : <GUI />}</Html>
      </PerspectiveCamera>
    </>
  );
}
