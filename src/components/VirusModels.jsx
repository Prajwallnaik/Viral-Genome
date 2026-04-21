import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Sphere, Cylinder, Dodecahedron, Octahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

function VirusModels({ virus }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Base glowing material with custom color applied
  const getMaterial = () => (
    <meshPhysicalMaterial 
      color={virus.color} 
      emissive={virus.color}
      emissiveIntensity={0.2}
      roughness={0.4} 
      metalness={0.6}
      transmission={0.2}
      thickness={1.5}
      clearcoat={1}
    />
  );

  const getSecondaryMaterial = () => (
    <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.3} />
  );

  const renderShape = () => {
    switch (virus.shape) {
      case 'spherical_spikes':
        return (
          <group>
            {/* Core */}
            <Sphere args={[2, 64, 64]} material={getMaterial()} />
            {/* Spikes */}
            {Array.from({ length: 40 }).map((_, i) => {
              const phi = Math.acos(-1 + (2 * i) / 40);
              const theta = Math.sqrt(40 * Math.PI) * phi;
              return (
                <Cylinder 
                  key={i} 
                  args={[0.05, 0.1, 0.8, 8]} 
                  position={[
                    2.2 * Math.cos(theta) * Math.sin(phi), 
                    2.2 * Math.cos(phi), 
                    2.2 * Math.sin(theta) * Math.sin(phi)
                  ]}
                  rotation={[phi + Math.PI/2, theta, 0]}
                  material={getSecondaryMaterial()}
                />
              );
            })}
          </group>
        );

      case 'spherical_bumped':
        return (
          <group>
            <Sphere args={[2.2, 32, 32]} material={getMaterial()} />
            <Icosahedron args={[2.25, 4]} material={getMaterial()} wireframe />
          </group>
        );

      case 'spherical_conical':
        return (
          <group>
            <Sphere args={[2.5, 32, 32]} material={getMaterial()} opacity={0.6} transparent />
            <Cylinder args={[0, 1.2, 2.5, 32]} rotation={[Math.PI / 4, 0, 0]} material={getSecondaryMaterial()} />
          </group>
        );

      case 'filamentous':
        return (
          <group>
            <Torus args={[2, 0.4, 32, 100, Math.PI * 1.5]} rotation={[0, 0, Math.PI / 4]} material={getMaterial()} />
            <Sphere args={[0.4, 32, 32]} position={[1.4, -1.4, 0]} material={getMaterial()} />
            <Sphere args={[0.4, 32, 32]} position={[-1.4, 1.4, 0]} material={getMaterial()} />
          </group>
        );

      case 'spherical_smooth':
        return <Sphere args={[2.2, 64, 64]} material={getMaterial()} />;

      case 'icosahedral':
        return <Icosahedron args={[2.5, 1]} material={getMaterial()} />;

      case 'bullet':
        return (
          <group>
            <Cylinder args={[1.5, 1.5, 3, 32]} material={getMaterial()} />
            <Sphere args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 1.5, 0]} material={getMaterial()} />
          </group>
        );

      case 'pleomorphic':
        return <Dodecahedron args={[2.5, 2]} material={getMaterial()} />;

      case 'icosahedral_detailed':
        return (
          <group>
            <Icosahedron args={[2.2, 2]} material={getMaterial()} />
            <Icosahedron args={[2.4, 2]} wireframe material={getSecondaryMaterial()} />
          </group>
        );

      default:
        return <Sphere args={[2, 32, 32]} material={getMaterial()} />;
    }
  };

  return (
    <group ref={groupRef}>
      {renderShape()}
    </group>
  );
}

export default VirusModels;
