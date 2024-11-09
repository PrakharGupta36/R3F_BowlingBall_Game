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
}

export default function Ball({ ballRef, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF("/Ball.glb") as BallGLTF;
  const ballMaterial = materials.ball as THREE.MeshStandardMaterial;

  const [ballRollingSound] = useState(new Audio("/Ball_Rolling.mp3"));

  const clicked = GameState((state) => state.clicked);
  const strength = GameState((state) => state.strength);
  const direction = GameState((state) => state.direction);

  useEffect(() => {
    if (clicked) {
      ballRef.current?.applyImpulse({ x: direction, y: 0, z: strength }, true);
      ballRollingSound.play();
    }
  }, [ballRef, ballRollingSound, clicked, direction, strength]);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    const normalMap = textureLoader.load("/floor_textures/normal_1k.png"); // Your texture path

    ballMaterial.normalMap = normalMap;
    ballMaterial.roughness = 0.6;
    ballMaterial.metalness = 0.1; // Subtle metallic look if desired
  }, [ballMaterial]);

  return (
    <>
      <RigidBody
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
          castShadow
          receiveShadow
          geometry={nodes.ballShape_ball_0.geometry}
          material={ballMaterial}
        />
      </RigidBody>

      <pointLight
        position={[0.75, 1, 16]} // Position the light close to the ball
        intensity={20}
        distance={10}
        color={new THREE.Color(0xffffff)}
        castShadow
      />
    </>
  );
}
