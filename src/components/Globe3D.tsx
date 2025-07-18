import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.2}>
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingElements = () => {
  return (
    <>
      {/* Floating rings */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[-3, 2, -2]}>
          <torusGeometry args={[0.5, 0.1, 16, 100]} />
          <meshStandardMaterial color="#A855F7" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh position={[3, -1, -1]}>
          <torusGeometry args={[0.3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#EC4899" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      {/* Floating cubes */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh position={[2, 2, -3]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#06B6D4" metalness={0.6} roughness={0.3} />
        </mesh>
      </Float>
    </>
  );
};

const Globe3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <AnimatedSphere />
        <FloatingElements />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Globe3D;