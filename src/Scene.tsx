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
import Walls from "./components/Walls";

export default function Scene() {
  const ballRef = useRef<RapierRigidBody>(null!);
  const ballMeshRef = useRef<THREE.Mesh>(null!);
  const camera = useRef<THREE.PerspectiveCamera>(null!);

  const clicked = GameState((state) => state.clicked);

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
        <Html>{!clicked && <GUI />}</Html>
      </PerspectiveCamera>
    </>
  );
}
