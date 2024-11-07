import { useGLTF } from "@react-three/drei";
import {
  RigidBody,
  RapierRigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useRef } from "react";

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

  // Define the positions and node names in an array
  const pinData = [
    {
      name: "#TOY0003_V2_Pin005_#TOY0003_V2_Textures_0",
      position: [0, 0.124, 0.12],
    },
    {
      name: "#TOY0003_V2_Pin010_#TOY0003_V2_Textures_0",
      position: [0.449, 0.124, -0.18],
    },
    {
      name: "#TOY0003_V2_Pin009_#TOY0003_V2_Textures_0",
      position: [0.15, 0.124, -0.18],
    },
    {
      name: "#TOY0003_V2_Pin008_#TOY0003_V2_Textures_0",
      position: [-0.15, 0.124, -0.18],
    },
    {
      name: "#TOY0003_V2_Pin007_#TOY0003_V2_Textures_0",
      position: [-0.449, 0.124, -0.18],
    },
    {
      name: "#TOY0003_V2_Pin006_#TOY0003_V2_Textures_0",
      position: [0.3, 0.124, 0.12],
    },
    {
      name: "#TOY0003_V2_Pin004_#TOY0003_V2_Textures_0",
      position: [-0.3, 0.124, 0.12],
    },
    {
      name: "#TOY0003_V2_Pin003_#TOY0003_V2_Textures_0",
      position: [0.15, 0.124, 0.419],
    },
    {
      name: "#TOY0003_V2_Pin002_#TOY0003_V2_Textures_0",
      position: [-0.15, 0.124, 0.419],
    },
    {
      name: "#TOY0003_V2_Pin001_#TOY0003_V2_Textures_0",
      position: [0, 0.124, 0.719],
    },
  ];

  // Create an array of refs for each RigidBody
  const pinRefs = useRef<RapierRigidBody[]>([]);

  return (
    <group {...props} dispose={null} position={[0, -0.8, -4]}>
      {pinData.map((pin, index) => (
        <RigidBody
          key={index}
          mass={0.5}
          contactSkin={0}
          scale={4.75}
          colliders='hull'
          ref={(ref) => (pinRefs.current[index] = ref!)} // Store ref in the array
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes[pin.name].geometry}
            material={materials.TOY0003_V2_Textures}
            position={pin.position as [number, number, number]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </RigidBody>
      ))}
    </group>
  );
}

// Preload the GLTF file for performance optimization
useGLTF.preload("/Pins.glb");
