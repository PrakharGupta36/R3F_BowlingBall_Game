import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Floor() {
  // Load all the textures
  const [diffuse, displacement, roughness] = useTexture([
    "/floor_textures/diff_1k.jpg",
    "/floor_textures/disp_1k.png",
    "/floor_textures/normal_1k.png",
    "/floor_textures/rough_1k.jpg",
  ]);

  return (
    <RigidBody type='fixed' contactSkin={0}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[9, 30]} />
        <meshPhysicalMaterial
          map={diffuse} // Base color map
          displacementMap={displacement} // Displacement map for depth
          // normalMap={normal} // Normal map for surface details
          roughnessMap={roughness} // Roughness map for shininess control
          roughness={1} // Adjust roughness as needed
          displacementScale={0.1} // Adjust displacement scale as needed
          side={THREE.DoubleSide}
        />
      </mesh>
    </RigidBody>
  );
}
