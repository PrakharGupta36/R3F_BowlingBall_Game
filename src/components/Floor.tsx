import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Floor() {
  // Load all the textures
  const [diffuse, displacement, normal, roughness, ao] = useTexture([
    "/floor_textures/diff_1k.jpg",
    "/floor_textures/disp_1k.png",
    "/floor_textures/normal_1k.png",
    "/floor_textures/rough_1k.png",
    "/floor_textures/ao_1k.jpg",
  ]);

  return (
    <RigidBody type='fixed' contactSkin={0}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.06, 0]}>
        <planeGeometry args={[13, 40]} />
        <meshPhysicalMaterial
          map={diffuse} // Base color map
          displacementMap={displacement} // Displacement map for depth
          normalMap={normal} // Normal map for surface details
          aoMap={ao}
          roughnessMap={roughness} // Roughness map for shininess control
          roughness={0.8} // Less roughness for slight shine
          metalness={0.1} // Slight metallic look for subtle reflections
          displacementScale={0.15} // More pronounced displacement
          clearcoat={0.2} // Adds a slight glossy finish
          clearcoatRoughness={0.5} // Controls glossiness
          side={THREE.DoubleSide}
        />
      </mesh>
    </RigidBody>
  );
}
