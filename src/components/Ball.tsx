import { useGLTF } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

// Define a type for the GLTF model
type BallGLTF = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    DefaultMaterial: THREE.Material;
  };
};

// Define the BallProps type to accept a ballRef prop
type BallProps = {
  ballRef: React.RefObject<RapierRigidBody>;
} & RigidBodyProps;

export default function Ball({ ballRef, ...props }: BallProps) {
  const { nodes, materials } = useGLTF("/Ball.glb") as BallGLTF;

  return (
    <RigidBody
      scale={0.55}
      ref={ballRef} // Pass the ballRef to RigidBody
      colliders='ball'
      position={[0, -0.8, 7]}
      friction={4}
      mass={10}
      {...props}
    >
      <group dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            onClick={() =>
              ballRef.current?.applyImpulse({ x: 0.08, y: 0, z: -6 }, true)
            }
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.DefaultMaterial}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </RigidBody>
  );
}

// Preload the GLTF file for performance optimization
useGLTF.preload("/Ball.glb");
