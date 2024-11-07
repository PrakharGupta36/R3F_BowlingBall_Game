import { Physics, RapierRigidBody } from "@react-three/rapier";
import Ball from "./components/Ball";
import Floor from "./components/Floor";
import Lights from "./components/Lights";
import { Pins } from "./components/Pins";

import { useRef } from "react";

export default function Scene() {
  const ballRef = useRef<RapierRigidBody>(null!);

  return (
    <>
      
      <Lights />

      <Physics debug gravity={[0, -9.8, 0]}>
        <Pins />
        <Ball ballRef={ballRef} />
        <Floor />
      </Physics>
    </>
  );
}
