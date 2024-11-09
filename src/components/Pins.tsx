import { useGLTF } from "@react-three/drei";
import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { GroupProps } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useRef, useState } from "react";
// import Label from "./Labels";

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

  const [pinFallingSound] = useState(new Audio("/Pins_Falling.mp3"));

  const pinData = [
    {
      name: "#TOY0003_V2_Pin001_#TOY0003_V2_Textures_0",
      position: [0, 0.124, 0.719],
      id: 1,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin002_#TOY0003_V2_Textures_0",
      position: [-0.15, 0.124, 0.419],
      id: 2,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin003_#TOY0003_V2_Textures_0",
      position: [0.15, 0.124, 0.419],
      id: 3,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin004_#TOY0003_V2_Textures_0",
      position: [-0.3, 0.124, 0.12],
      id: 4,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin005_#TOY0003_V2_Textures_0",
      position: [0, 0.124, 0.12],
      id: 5,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin006_#TOY0003_V2_Textures_0",
      position: [0.3, 0.124, 0.12],
      id: 6,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin007_#TOY0003_V2_Textures_0",
      position: [-0.449, 0.124, -0.18],
      id: 7,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin008_#TOY0003_V2_Textures_0",
      position: [-0.15, 0.124, -0.18],
      id: 8,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin009_#TOY0003_V2_Textures_0",
      position: [0.15, 0.124, -0.18],
      id: 9,
      isFallen: false,
    },
    {
      name: "#TOY0003_V2_Pin010_#TOY0003_V2_Textures_0",
      position: [0.449, 0.124, -0.18],
      id: 10,
      isFallen: false,
    },
  ];

  // Create an array of refs for each mesh
  const pinRefs = useRef<THREE.Mesh[]>([]);

  return (
    <>
      <group {...props} dispose={null} position={[0, -1.15, -14]}>
        {pinData.map((pin) => (
          <RigidBody
            key={pin.id}
            mass={0.2}
            contactSkin={0}
            scale={7}
            colliders='hull'
            onIntersectionExit={() => {
              pinFallingSound.volume = 0.4;
              pinFallingSound.play();
            }}
          >
            {/* <Label pin={pin} /> */}
            <mesh
              name={`Pin-${pin.id}`}
              castShadow
              receiveShadow
              geometry={nodes[pin.name].geometry}
              material={materials.TOY0003_V2_Textures}
              position={pin.position as [number, number, number]}
              rotation={[-Math.PI / 2, 0, 0]}
              ref={(ref) => (pinRefs.current[pin.id] = ref!)} // Attach the ref to the mesh
            />
          </RigidBody>
        ))}
      </group>
      {/* <pointLight
        position={[1, 3, -16]}
        intensity={10}
        distance={0}
        color={new THREE.Color(0xffffff)}
        castShadow
      /> */}
    </>
  );
}

// Preload the GLTF file for performance optimization
useGLTF.preload("/Pins.glb");
