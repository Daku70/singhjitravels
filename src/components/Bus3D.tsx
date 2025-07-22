import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedBus = () => {
  const busRef = useRef<THREE.Group>(null);
  const wheelFrontRef = useRef<THREE.Mesh>(null);
  const wheelBackRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (busRef.current) {
      // Gentle swaying motion
      busRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      busRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    }
    
    // Rotating wheels
    if (wheelFrontRef.current) {
      wheelFrontRef.current.rotation.z += 0.02;
    }
    if (wheelBackRef.current) {
      wheelBackRef.current.rotation.z += 0.02;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
      <group ref={busRef} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
        {/* Bus Body */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.2, 0.6, 0.5]} />
          <meshStandardMaterial 
            color="#3B82F6" 
            metalness={0.7} 
            roughness={0.2}
            emissive="#1E40AF"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Bus Roof */}
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[1.1, 0.1, 0.4]} />
          <meshStandardMaterial color="#1E40AF" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Front */}
        <mesh position={[0.7, 0.2, 0]}>
          <boxGeometry args={[0.1, 0.5, 0.45]} />
          <meshStandardMaterial color="#1D4ED8" metalness={0.8} roughness={0.1} />
        </mesh>

        {/* Windows */}
        {/* Front window */}
        <mesh position={[0.65, 0.35, 0]}>
          <boxGeometry args={[0.02, 0.25, 0.35]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            transparent 
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Side windows */}
        <mesh position={[0.2, 0.35, 0.26]}>
          <boxGeometry args={[0.3, 0.25, 0.02]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            transparent 
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-0.2, 0.35, 0.26]}>
          <boxGeometry args={[0.3, 0.25, 0.02]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            transparent 
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Mirror windows on other side */}
        <mesh position={[0.2, 0.35, -0.26]}>
          <boxGeometry args={[0.3, 0.25, 0.02]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            transparent 
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-0.2, 0.35, -0.26]}>
          <boxGeometry args={[0.3, 0.25, 0.02]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            transparent 
            opacity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Front Wheel */}
        <mesh ref={wheelFrontRef} position={[0.4, -0.2, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#1F2937" metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh ref={wheelFrontRef} position={[0.4, -0.2, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#1F2937" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Back Wheel */}
        <mesh ref={wheelBackRef} position={[-0.4, -0.2, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#1F2937" metalness={0.3} roughness={0.7} />
        </mesh>
        <mesh ref={wheelBackRef} position={[-0.4, -0.2, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#1F2937" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Door */}
        <mesh position={[-0.3, 0.1, 0.26]}>
          <boxGeometry args={[0.25, 0.4, 0.02]} />
          <meshStandardMaterial color="#1E40AF" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Headlights */}
        <mesh position={[0.75, 0.15, 0.15]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial 
            color="#FBBF24" 
            emissive="#FBBF24"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.75, 0.15, -0.15]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial 
            color="#FBBF24" 
            emissive="#FBBF24"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Bus3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [2, 0.5, 3], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#8B5CF6" />
        <pointLight position={[-5, 3, -5]} intensity={0.8} color="#3B82F6" />
        <directionalLight position={[0, 10, 0]} intensity={0.5} />
        
        <group position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
          <AnimatedBus />
        </group>
        
        {/* Floating particles around bus */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Float 
            key={i}
            speed={2 + i * 0.5} 
            rotationIntensity={0.5} 
            floatIntensity={0.3}
          >
            <mesh
              position={[
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 3 + 1,
                (Math.random() - 0.5) * 4
              ]}
            >
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial 
                color="#8B5CF6" 
                metalness={1} 
                roughness={0}
                emissive="#8B5CF6"
                emissiveIntensity={0.3}
              />
            </mesh>
          </Float>
        ))}
      </Canvas>
    </div>
  );
};

export default Bus3D;