import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { GroupProps, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useEffect, useRef, useState } from "react";

import { GameState } from "../hooks/GameState";

// Define a type for the GLTF model
type PinsGLTF = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

type PinsProps = GroupProps & RigidBodyProps;

export function Pins(props: PinsProps) {
  const { nodes, materials } = useGLTF("/models/Pins.glb") as PinsGLTF;

  // Array of refs for each pin's RigidBody
  const pinRefs = useRef<(RapierRigidBody | null)[]>([]);

  const pinMeshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const pinsData = GameState((state) => state.pinsData);

  // const setPinsData = GameState((state) => state.setPinsData);

  // const booleans = GameState((state) => state.booleans);

  // const { isThrow } = booleans;

  const [fallenPinIds, setFallenPinIds] = useState<number[]>([]);

  const lightColors = [
    "#FFDFD3", // Light Peach
    "#FFECB3", // Light Yellow
    "#D3F8E2", // Mint Green
    "#CCE5FF", // Light Sky Blue
    "#FFD1DC", // Light Pink
    "#FFF5BA", // Pale Yellow
    "#E6E6FA", // Lavender
    "#D3D3D3", // Light Gray
    "#C5E1A5", // Light Green
    "#FFF9C4", // Light Lemon
  ];

  // Add the useFrame hook
  useFrame(() => {
    // Check the rotation of each pin on every frame

    pinRefs.current.forEach((pinRef, index) => {
      // console.log({ id: pinsData[index].id, rotation: pinRef?.rotation() });

      if (pinRef) {
        const rotation = pinRef.rotation();

        if (
          rotation.w < 0.7 ||
          rotation.x > 0.4 ||
          rotation.y > 0.4 ||
          rotation.z > 0.4
        ) {
          const pinId = pinsData[index].id;
          // If the pin ID is not already in the fallenPinIds array, add it
          setFallenPinIds((prevIds) => {
            if (!prevIds.includes(pinId)) {
              const newIds = [...prevIds, pinId].sort((a, b) => a - b);
              // console.log(`Fallen pins in ascending order: ${newIds}`);
              return newIds;
            }
            return prevIds;
          });
        }
      }
    });
  });

  // useEffect(() => {
  //   if (isThrow) {
  //     setTimeout(() => {
  //       fallenPinIds.forEach((pinId) => {
  //         setPinsData(pinId); // Mark pin as fallen
  //       });
  //     }, 5000); // 5-second delay
  //   }
  // }, [fallenPinIds, isThrow, setPinsData, pinsData]);

  useEffect(() => {
    console.log(fallenPinIds);
  }, [fallenPinIds]);

  return (
    <group {...props} dispose={null} position={[0, -1.15, -14]}>
      <OrbitControls />
      {pinsData.map((pin, index) => {
        return !pin.isFallen ? (
          <RigidBody
            name={`Pin-${pin.id}`}
            key={pin.id}
            ref={(ref) => (pinRefs.current[index] = ref)}
            mass={0.5}
            density={5}
            restitution={0.005}
            scale={7}
            colliders='hull'
          >
            <mesh
              name={`Pin-${pin.id}`}
              ref={(ref) => (pinMeshRefs.current[index] = ref)}
              castShadow
              receiveShadow
              geometry={nodes[pin.name].geometry}
              material={materials.TOY0003_V2_Textures}
              position={pin.position as [number, number, number]}
              rotation={pin.rotation as [number, number, number]}
            />
            <Html
              center
              position={
                [
                  pin.position[0] + 0.01,
                  0.025 * pin.id + 0.3,
                  pin.position[2],
                ] as [number, number, number]
              }
            >
              <span
                style={{
                  display: "flex",
                  backgroundColor: `${lightColors[pin.id - 1]}`,
                  borderRadius: "100%",
                  width: "30px",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "30px",
                  opacity: 0.4,
                }}
              >
                {pin.id}
              </span>
            </Html>
          </RigidBody>
        ) : null;
      })}
    </group>
  );
}

useGLTF.preload("/models/Pins.glb");
