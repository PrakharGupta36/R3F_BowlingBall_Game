import { useGLTF } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { GroupProps, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useRef, useState } from "react";
// import { a, } from "@react-spring/three";
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

  const setPinsData = GameState((state) => state.setPinsData);

  const [fallenPinIds, setFallenPinIds] = useState<number[]>([]);

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

  useFrame(() => {
    setTimeout(() => {
      fallenPinIds.map((e) => {
        setPinsData(e, "positionY", -100);
      });
    }, 1000);
  });

  return (
    <group {...props} dispose={null} position={[0, -1.15, -14]}>
      {pinsData.map((pin, index) => {
        const position = pin.position();
        return (
          <RigidBody
            name={`Pin-${pin.id}`}
            key={pin.id}
            ref={(ref) => (pinRefs.current[index] = ref)}
            mass={0.5}
            position={position as [number, number, number]}
            density={5}
            scale={7.5}
            restitution={0.005}
            colliders='hull'
          >
            <mesh
              name={`Pin-${pin.id}`}
              ref={(ref) => (pinMeshRefs.current[index] = ref)}
              castShadow
              receiveShadow
              geometry={nodes[pin.name].geometry}
              // scale={0}
              material={materials.TOY0003_V2_Textures}
              position={position as [number, number, number]}
              rotation={pin.rotation as [number, number, number]}
            />
          </RigidBody>
        );
      })}
    </group>
  );
}

useGLTF.preload("/models/Pins.glb");
