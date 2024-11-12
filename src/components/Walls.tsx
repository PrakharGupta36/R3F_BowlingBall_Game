import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Walls() {
  // Load available textures
  const [diffuse, normal, roughness] = useTexture([
    "/wall_textures/diff_1k.jpg",
    // "/wall_textures/disp_1k.png",
    "/wall_textures/normal_1k.png",
    "/wall_textures/rough_1k.png",
  ]);

  // Wall and ceiling configurations
  const wallConfigs = [
    {
      name: "wall-left",
      rotation: [0, -Math.PI / 2, 0],
      position: [6.5, 0, 0],
      size: [50, 20],
    },
    {
      name: "wall-right",
      rotation: [0, -Math.PI / 2, 0],
      position: [-6.5, 0, 0],
      size: [50, 20],
    },
    {
      name: "ceiling",
      rotation: [-Math.PI / 2, 0, 0],
      position: [1, 9, 0],
      size: [20, 40],
    },
    // {
    //   name: "wall-behind",
    //   rotation: [0, 0, 0],
    //   position: [0, 0, -20],
    //   size: [20, 20],
    // },
  ];

  return (
    <>
      {wallConfigs.map((config) => (
        <RigidBody key={config.name} type='fixed' contactSkin={0}>
          <mesh
            name={config.name}
            receiveShadow
            rotation={config.rotation as [number, number, number]}
            position={config.position as [number, number, number]}
          >
            <planeGeometry args={config.size as [number, number]} />
            <meshPhysicalMaterial
              map={diffuse}
              // displacementMap={displacement}
              normalMap={normal}
              roughnessMap={roughness}
              roughness={.4} // Slightly more reflective for realism
              metalness={0.2} // Very subtle metallic shine for texture
              displacementScale={0.5} // Slight displacement for surface depth
              clearcoat={0.1} // Soft glossy layer for shine
              clearcoatRoughness={0.5} // A bit smoother clearcoat for reflections
              side={THREE.DoubleSide}
              color={"#575757"} // Subtle color variation for realism
            />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}
