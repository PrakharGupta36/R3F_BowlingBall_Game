import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { TextureLoader } from "three";
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

export default function Ball({ ballRef, ballMeshRef, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF("/Ball.glb") as BallGLTF;
  const ballMaterial = materials.ball as THREE.MeshStandardMaterial;
  const [ballRollingSound] = useState(new Audio("/Ball_Rolling.mp3"));
  const [key, setKey] = useState(0); // Key for forcing RigidBody remount

  const clicked = GameState((state) => state.clicked);
  const strength = GameState((state) => state.strength);
  const direction = GameState((state) => state.direction);
  const booleans = GameState((state) => state.booleans);
  const { isThrow } = booleans;
  const setClicked = GameState((state) => state.setClicked);
  const setBoolean = GameState((state) => state.setBooleans);

  // Handle ball impulse
  useEffect(() => {
    if (clicked && ballRef.current) {
      ballRef.current.applyImpulse({ x: direction, y: 0, z: strength }, true);
      ballRollingSound.play();
    }
  }, [ballRef, ballRollingSound, clicked, direction, strength]);

  // Handle reset
  useEffect(() => {
    if (isThrow) {
      setTimeout(() => {
        // Reset game state
        setClicked(false);
        setBoolean("isStrength", false);
        setBoolean("isDirection", false);
        setBoolean("isThrow", false);

        // Force RigidBody remount
        setKey((prev) => prev + 1);
      }, 5000);
    }
  }, [isThrow, setClicked, setBoolean]);

  // Handle texture loading
  useEffect(() => {
    const textureLoader = new TextureLoader();
    const normalMap = textureLoader.load("/floor_textures/normal_1k.png");
    ballMaterial.normalMap = normalMap;
    ballMaterial.roughness = 0.6;
    ballMaterial.metalness = 0.1;
  }, [ballMaterial]);

  return (
    <>
      <RigidBody
        key={key} // Force remount when key changes
        scale={0.055}
        ref={ballRef}
        colliders='ball'
        position={[0, -0.4, 16]}
        friction={100}
        mass={2}
        restitution={0}
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

      <pointLight
        position={[0.75, 1, 16]}
        intensity={20}
        distance={10}
        color={new THREE.Color(0xffffff)}
        castShadow
      />
    </>
  );
}
