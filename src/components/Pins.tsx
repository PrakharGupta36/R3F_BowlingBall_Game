import { useGLTF } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useRef } from "react";

import { pinsData } from "../utils/arrays";

// Define a type for the GLTF model
type PinsGLTF = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

// Define props for the Pins component, extending GroupProps for compatibility
type PinsProps = GroupProps & RigidBodyProps;

export function Pins(props: PinsProps) {
  const { nodes, materials } = useGLTF("/Pins.glb") as PinsGLTF;

  // Array of refs for each pin's RigidBody
  const pinRefs = useRef<(RapierRigidBody | null)[]>([]);

  return (
    <group {...props} dispose={null} position={[0, -1.15, -14]}>
      {pinsData.map((pin, index) => (
        <RigidBody
          key={pin.id}
          ref={(ref) => (pinRefs.current[index] = ref)}
          mass={10}
          density={2}
          restitution={0.02}
          scale={7}
          colliders='hull'
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes[pin.name].geometry}
            material={materials.TOY0003_V2_Textures}
            position={pin.position as [number, number, number]}
            rotation={pin.rotation as [number, number, number]}
          />
        </RigidBody>
      ))}
    </group>
  );
}

// Preload the GLTF file for performance optimization
useGLTF.preload("/Pins.glb");
