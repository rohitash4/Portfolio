import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function OrbMesh() {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.12;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.8}>
      <mesh ref={mesh} scale={2.05}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#d8ff68"
          emissive="#516600"
          emissiveIntensity={0.65}
          roughness={0.22}
          metalness={0.38}
          distort={0.32}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

export function Orb() {
  return (
    <Canvas camera={{ position: [0, 0, 5.8], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={4} color="#f4ffd2" />
      <pointLight position={[-3, -2, 3]} intensity={8} color="#728aff" />
      <OrbMesh />
    </Canvas>
  );
}
