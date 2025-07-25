import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TestimonialBubble = ({ position, scale = 1, delay = 0, children }: { 
  position: [number, number, number], 
  scale?: number, 
  delay?: number,
  children: React.ReactNode 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.05}>
        {children}
      </Float>
    </group>
  );
};

const Testimonials3D = () => {
  return (
    <div className="w-full h-48 relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.4} />

        {/* Quote bubbles */}
        <TestimonialBubble position={[-3, 0, 0]} scale={0.8} delay={0}>
          <mesh>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial 
              color="#8B5CF6" 
              metalness={0.2} 
              roughness={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        </TestimonialBubble>

        <TestimonialBubble position={[0, 1, -1]} scale={1} delay={1}>
          <mesh>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial 
              color="#EC4899" 
              metalness={0.2} 
              roughness={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
        </TestimonialBubble>

        <TestimonialBubble position={[3, -0.5, 0]} scale={0.9} delay={2}>
          <mesh>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial 
              color="#06B6D4" 
              metalness={0.2} 
              roughness={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        </TestimonialBubble>

        {/* Floating hearts */}
        {Array.from({ length: 5 }).map((_, i) => (
          <TestimonialBubble 
            key={i} 
            position={[
              (Math.random() - 0.5) * 6, 
              (Math.random() - 0.5) * 3, 
              (Math.random() - 0.5) * 2
            ]} 
            scale={0.3}
            delay={i * 0.5}
          >
            <mesh>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial 
                color="#F472B6" 
                metalness={0.8} 
                roughness={0.2}
                emissive="#F472B6"
                emissiveIntensity={0.1}
              />
            </mesh>
          </TestimonialBubble>
        ))}

        {/* Removed orbit controls for non-interactive mode */}
      </Canvas>
    </div>
  );
};

export default Testimonials3D;