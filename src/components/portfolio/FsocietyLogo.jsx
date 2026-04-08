import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function RotatingLogo() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Circle */}
      <mesh>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Inner Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#000000" 
          wireframe={true}
          emissive="#a855f7"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default function FsocietyLogo() {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#9333ea" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c084fc" />
        <RotatingLogo />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="font-mono text-purple-400 text-sm">fsociety.dat</p>
        <p className="font-mono text-purple-600 text-xs mt-1">// Control is an illusion</p>
      </div>
    </div>
  );
}