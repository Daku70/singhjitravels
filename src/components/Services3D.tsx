import { Canvas } from '@react-three/fiber';
import { Float, useGLTF, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AnimatedCard = ({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + delay) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3} 
          roughness={0.4}
          transparent
          opacity={0.9}
        />
        {/* Service icon representation */}
        <mesh position={[0, 0.3, 0.03]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
      </mesh>
    </Float>
  );
};

const Services3D = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full h-64 relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: 'transparent' }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-5, 5, 5]} intensity={0.4} />

        {/* Service Cards */}
        <AnimatedCard position={[-1.5, 0, 0]} color="#3B82F6" delay={0} />
        <AnimatedCard position={[-0.5, 0, 0]} color="#10B981" delay={0.5} />
        <AnimatedCard position={[0.5, 0, 0]} color="#F59E0B" delay={1} />
        <AnimatedCard position={[1.5, 0, 0]} color="#EF4444" delay={1.5} />

        {/* Connecting lines */}
        <mesh position={[0, -0.5, -0.1]}>
          <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
          <meshStandardMaterial color="#8B5CF6" />
        </mesh>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={hovered}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};

export default Services3D;