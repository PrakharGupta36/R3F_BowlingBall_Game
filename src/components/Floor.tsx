import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Floor() {
  const [diffuse, displacement, normal, roughness] = useTexture([
    "/floor_textures/diff_1k.jpg",
    "/floor_textures/disp_1k.png",
    "/floor_textures/normal_1k.png",
    "/floor_textures/rough_1k.png",
  ]);

  return (
    <RigidBody type='fixed' contactSkin={0}>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.06, 0]}
      >
        <planeGeometry args={[13, 40]} />
        <meshPhysicalMaterial
          map={diffuse}
          displacementMap={displacement}
          normalMap={normal}
          roughnessMap={roughness}
          roughness={0.4} // A bit more reflective for realism
          metalness={0.1} // Slight metallic look
          displacementScale={0.2} // Subtle depth for more realism
          clearcoat={0.1} // Soft shine for a semi-polished look
          clearcoatRoughness={0.3} // Adds slight gloss to highlights
          side={THREE.DoubleSide}
          color={"#b8b8b8"} // Slightly altered base color for realism
        />
      </mesh>
    </RigidBody>
  );
}
