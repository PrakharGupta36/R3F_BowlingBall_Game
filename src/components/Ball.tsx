import { useEffect, useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { GameState } from "../hooks/GameState";

type BallGLTF = GLTF & {
  nodes: { ballShape_ball_0: THREE.Mesh };
  materials: { ball: THREE.Material };
};

interface ModelProps extends RigidBodyProps {
  ballRef: React.RefObject<RapierRigidBody>;
  ballMeshRef: React.RefObject<THREE.Mesh>;
}

export default function Ball({
  ballRef,
  ballMeshRef,

  ...props
}: ModelProps) {
  const { nodes, materials } = useGLTF("/models/Ball.glb") as BallGLTF;
  const ballMaterial = materials.ball as THREE.MeshStandardMaterial;
  const [ballRollingSound] = useState(new Audio("/sounds/Ball_Rolling.mp3"));
  // const [key, setKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const [key, setKey] = useState(0);

  const clicked = GameState((state) => state.clicked);
  const strength = GameState((state) => state.strength);
  const direction = GameState((state) => state.direction);
  const booleans = GameState((state) => state.booleans);
  const { isThrow } = booleans;
  const setClicked = GameState((state) => state.setClicked);
  const setBoolean = GameState((state) => state.setBooleans);
  const ballResetTime = GameState((state) => state.ballResetTime);
  const [count, setCount] = useState(ballResetTime);
  const setTries = GameState((state) => state.setTries);

  useEffect(() => {
    if (clicked && ballRef.current) {
      ballRef.current.applyImpulse({ x: direction, y: 0, z: strength }, true);
      ballRollingSound.play();
    }
  }, [ballRef, ballRollingSound, clicked, direction, strength]);

  useEffect(() => {
    if (isThrow) {
      setCount(ballResetTime);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isThrow, ballResetTime]);

  useEffect(() => {
    if (count === 0 && isThrow) {
      setClicked(false);
      setBoolean("isStrength", false);
      setBoolean("isDirection", false);
      setBoolean("isThrow", false);
      setKey((prev) => prev + 1);
      setTries();
      setCount(ballResetTime);
    }
  }, [count, isThrow, ballResetTime, setClicked, setBoolean, setKey, setTries]);

  useEffect(() => {
    ballMaterial.roughness = 0.1;
    ballMaterial.metalness = 0.1;
  }, [ballMaterial]);

  return (
    <>
      <RigidBody
        key={key}
        scale={0.055}
        name='Ball'
        ref={ballRef}
        colliders='ball'
        position={[0, -0.4, 16]}
        friction={20}
        mass={15}
        restitution={0.0000001}
        {...props}
      >
        <mesh
          ref={ballMeshRef}
          castShadow
          receiveShadow
          geometry={nodes.ballShape_ball_0.geometry}
          material={ballMaterial}
        />
      </RigidBody>
    </>
  );
}

useGLTF.preload("/models/Ball.glb");
