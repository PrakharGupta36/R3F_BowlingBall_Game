import { Physics, RapierRigidBody } from "@react-three/rapier";
import Ball from "./components/Ball";
import Floor from "./components/Floor";
import Lights from "./components/Lights";
import { Pins } from "./components/Pins";

import { useRef } from "react";
import { Html, PerspectiveCamera } from "@react-three/drei";
import GUI from "./components/GUI";
import * as THREE from "three";
import { GameState } from "./hooks/GameState";

export default function Scene() {
  const ballRef = useRef<RapierRigidBody>(null!);

  const camera = useRef<THREE.PerspectiveCamera>(null!);

  const booleans = GameState((state) => state.booleans);

  const { isThrow } = booleans;

  return (
    <>
      <PerspectiveCamera position={[0, -1, -6]} ref={camera}>
        <Lights />
        <Physics gravity={[0, -9.8, 0]}>
          <Pins />
          <Ball ballRef={ballRef} />
          <Floor />
        </Physics>
        <Html center> {!isThrow && <GUI />} </Html>
      </PerspectiveCamera>
    </>
  );
}
