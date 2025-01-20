'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Float
} from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const sceneRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Mesh>(null);
  const characterRef = useRef<THREE.Group>(null);
  
  // Create particles for ambient effect
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = Math.random() * 5;
      const z = (Math.random() - 0.5) * 10;
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    // Gentle scene movement
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    // Screen glow effect
    if (monitorRef.current) {
      monitorRef.current.material.emissiveIntensity = 
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }

    // Subtle breathing animation for character
    if (characterRef.current) {
      characterRef.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.005;
      // Subtle typing motion
      characterRef.current.children.forEach((child, index) => {
        if (child.name === 'arm') {
          child.position.y = Math.sin(state.clock.elapsedTime * 8 + index) * 0.02;
        }
      });
    }
  });

  return (
    <>
      {/* Advanced Environment Setup */}
      <Environment preset="city" />
      <AccumulativeShadows 
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={100}
        temporal
      >
        <RandomizedLight 
          position={[5, 5, -10]} 
          radius={5} 
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows>

      {/* Camera Controls */}
      <OrbitControls 
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />

      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#fff" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#fff" />

      {/* Main Scene */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <group ref={sceneRef}>
          {/* Modern Desk Setup */}
          <mesh receiveShadow position={[0, -1, 0]}>
            <boxGeometry args={[4, 0.1, 2]} />
            <meshStandardMaterial 
              color="#2a2a2a"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Office Chair */}
          <group position={[0, -0.5, 0.8]}>
            {/* Chair Base */}
            <mesh castShadow>
              <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Chair Post */}
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
              <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Chair Seat */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[0.6, 0.1, 0.6]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
            {/* Chair Back */}
            <mesh position={[0, 1, -0.25]} rotation={[Math.PI * 0.1, 0, 0]} castShadow>
              <boxGeometry args={[0.6, 0.8, 0.1]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
          </group>

          {/* Character */}
          <group ref={characterRef} position={[0, -0.5, 0.8]}>
            {/* Torso */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <capsuleGeometry args={[0.2, 0.4, 8, 16]} />
              <meshStandardMaterial color="#3a3a3a" />
            </mesh>

            {/* Head */}
            <group position={[0, 1.2, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#F3F4F6" />
              </mesh>
              {/* Hair */}
              <mesh position={[0, 0.08, 0]} castShadow>
                <sphereGeometry args={[0.16, 32, 32]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
              {/* Glasses */}
              <mesh position={[0, 0, 0.12]} rotation={[0.1, 0, 0]}>
                <boxGeometry args={[0.28, 0.08, 0.05]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
              </mesh>
            </group>

            {/* Arms */}
            <mesh name="arm" position={[-0.3, 0.8, 0.2]} rotation={[0.5, 0, -0.3]} castShadow>
              <capsuleGeometry args={[0.05, 0.4, 8, 16]} />
              <meshStandardMaterial color="#3a3a3a" />
            </mesh>
            <mesh name="arm" position={[0.3, 0.8, 0.2]} rotation={[0.5, 0, 0.3]} castShadow>
              <capsuleGeometry args={[0.05, 0.4, 8, 16]} />
              <meshStandardMaterial color="#3a3a3a" />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.15, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.15, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </group>

          {/* Monitor and other desk items remain the same */}
          <group position={[0, 0, -0.5]}>
            <mesh castShadow>
              <boxGeometry args={[3, 1.4, 0.1]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
            
            <mesh ref={monitorRef} position={[0, 0, 0.051]}>
              <planeGeometry args={[2.9, 1.3]} />
              <meshStandardMaterial
                color="#000000"
                emissive="#4f46e5"
                emissiveIntensity={1}
                toneMapped={false}
              />
            </mesh>

            <mesh castShadow position={[0, -0.8, 0.2]}>
              <cylinderGeometry args={[0.1, 0.15, 0.6, 32]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
          </group>

          {/* Rest of desk items remain the same */}
          {/* ... Keyboard, Mouse, Coffee Cup, etc. ... */}

          {/* Ambient Particles */}
          {particles.map((particle, i) => (
            <mesh
              key={i}
              position={[particle.x, particle.y, particle.z]}
            >
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshStandardMaterial
                color="#4f46e5"
                transparent
                opacity={0.2}
                emissive="#4f46e5"
                emissiveIntensity={1}
              />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Ground Shadows */}
      <ContactShadows
        position={[0, -1.01, 0]}
        opacity={0.7}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  );
}