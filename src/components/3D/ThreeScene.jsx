import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Preload } from '@react-three/drei';
import VirusModels from './VirusModels';

function ThreeScene({ selectedVirus, sequence, rnaVisible, speed, showShell }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ antialias: true }}>
      
      {/* Scene Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1} color={selectedVirus.color} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#00f0ff" />
      
      {/* Background Elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Environment for organic reflections */}
      <Environment preset="city" />

      {/* Main Object rendering */}
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <VirusModels 
            virus={selectedVirus} 
            sequence={sequence} 
            rnaVisible={rnaVisible} 
            speed={speed} 
            showShell={showShell} 
          />
        </Float>
        <Preload all />
      </Suspense>

      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        minDistance={5} 
        maxDistance={40} 
        autoRotate={false} 
      />
      
      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#05050a', 10, 40]} />
    </Canvas>
  );
}

export default ThreeScene;
