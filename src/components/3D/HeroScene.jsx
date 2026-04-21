import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Preload, AdaptiveDpr } from '@react-three/drei';
import VirusModels from './VirusModels';
import * as THREE from 'three';

// Subtle ambient particle field
function Particles() {
  const ref = useRef();
  const count = 200;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ virus, sequence, speed, showShell, rnaVisible }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <AdaptiveDpr pixelated />
      <color attach="background" args={['#04040a']} />

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[8, 8, 4]} intensity={1.2} color="#ffffff" castShadow />
      <pointLight position={[-10, -6, -8]} intensity={2} color={virus.color} />
      <pointLight position={[10, 6, 8]} intensity={0.6} color="#7b61ff" />
      <spotLight position={[0, 18, 0]} angle={0.25} penumbra={1} intensity={3} color="#00e5ff" castShadow />

      {/* Stars and Particles */}
      <Stars radius={80} depth={60} count={3000} factor={3} fade speed={0.8} />
      <Particles />

      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* Virus 3D Object */}
      <Suspense fallback={null}>
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
          <VirusModels
            virus={virus}
            sequence={sequence}
            speed={speed}
            showShell={showShell}
            rnaVisible={rnaVisible}
          />
        </Float>
        <Preload all />
      </Suspense>

      {/* Interactive Camera */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={30}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />

      <fog attach="fog" args={['#04040a', 20, 60]} />
    </Canvas>
  );
}
