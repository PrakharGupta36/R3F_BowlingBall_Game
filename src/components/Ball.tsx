import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { GameState } from "../hooks/GameState";

// Define a type for the GLTF model
type BallGLTF = GLTF & {
  nodes: {
    ballShape_ball_0: THREE.Mesh;
  };
  materials: {
    ball: THREE.Material;
  };
};

interface ModelProps extends RigidBodyProps {
  ballRef: React.RefObject<RapierRigidBody>;
}

export default function Ball({ ballRef, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF("/Ball.glb") as BallGLTF;
  const [ballRollingSound] = React.useState(new Audio("/Ball_Rolling.mp3"));

  const clicked = GameState((state) => state.clicked);
  const strength = GameState((state) => state.strength);
  const direction = GameState((state) => state.direction);

  useEffect(() => {
    if (clicked) {
      ballRef.current?.applyImpulse({ x: direction, y: 0, z: -9 }, true);
      ballRollingSound.play();
    }
  }, [ballRef, ballRollingSound, clicked, strength, direction]);

  return (
    <RigidBody
      scale={0.04}
      ref={ballRef}
      colliders='ball'
      position={[0, -0.5, 7.5]}
      friction={4}
      mass={10}
      {...props}
    >
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ballShape_ball_0.geometry}
          material={materials.ball}
          // onClick={() => setClicked(true)}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/Ball.glb");
