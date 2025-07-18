import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingIcon = ({ position, color, children }: { position: [number, number, number], color: string, children: React.ReactNode }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
        {children}
      </Float>
    </group>
  );
};

const TravelIcons3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />

        {/* Airplane */}
        <FloatingIcon position={[-4, 1, 0]} color="#8B5CF6">
          <mesh>
            <coneGeometry args={[0.1, 0.6, 8]} />
            <meshStandardMaterial color="#8B5CF6" metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.4, 0.05, 0.05]} />
            <meshStandardMaterial color="#A855F7" />
          </mesh>
        </FloatingIcon>

        {/* Car */}
        <FloatingIcon position={[4, -1, 0]} color="#EC4899">
          <mesh>
            <boxGeometry args={[0.4, 0.15, 0.2]} />
            <meshStandardMaterial color="#EC4899" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-0.15, -0.1, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
          <mesh position={[0.15, -0.1, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
            <meshStandardMaterial color="#1F2937" />
          </mesh>
        </FloatingIcon>

        {/* Mountain */}
        <FloatingIcon position={[-2, -2, -1]} color="#06B6D4">
          <mesh>
            <coneGeometry args={[0.3, 0.5, 4]} />
            <meshStandardMaterial color="#06B6D4" metalness={0.4} roughness={0.6} />
          </mesh>
        </FloatingIcon>

        {/* Compass */}
        <FloatingIcon position={[3, 2, -1]} color="#F59E0B">
          <mesh>
            <torusGeometry args={[0.2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh>
            <coneGeometry args={[0.03, 0.15, 8]} />
            <meshStandardMaterial color="#EF4444" />
          </mesh>
        </FloatingIcon>

        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <FloatingIcon 
            key={i} 
            position={[
              (Math.random() - 0.5) * 8, 
              (Math.random() - 0.5) * 4, 
              (Math.random() - 0.5) * 4
            ]} 
            color="#8B5CF6"
          >
            <mesh>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial 
                color="#8B5CF6" 
                metalness={1} 
                roughness={0}
                emissive="#8B5CF6"
                emissiveIntensity={0.2}
              />
            </mesh>
          </FloatingIcon>
        ))}
      </Canvas>
    </div>
  );
};

export default TravelIcons3D;