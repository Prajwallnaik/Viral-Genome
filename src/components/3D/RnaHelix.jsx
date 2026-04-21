import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BASE_COLORS } from '../../utils/mutationSimulator';

const RnaHelix = ({ sequence, visible, speed, ...props }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  const { backbonePoints, basePoints } = useMemo(() => {
    const backbone = [];
    const basePairs = [];
    
    const numBases = sequence.length;
    const radius = 0.8;
    const height = 4;
    
    // We sample more points for the backbone so it looks like a continuous pearl chain of small spheres
    const backboneResolution = numBases * 3;

    for (let i = 0; i < backboneResolution; i++) {
        const t = i / (backboneResolution - 1);
        const angle = t * Math.PI * 8; 
        const y = (t - 0.5) * height; 
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        backbone.push(new THREE.Vector3(x, y, z));
    }

    // Now computing the base pairs that protrude inward
    for (let i = 0; i < numBases; i++) {
      const t = i / (numBases - 1); // 0 to 1
      const angle = t * Math.PI * 8; // 4 full turns
      const y = (t - 0.5) * height; // centered around 0
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      const pos = new THREE.Vector3(x, y, z);
      
      // Get base color
      const baseChar = sequence[i] || 'A';
      const colorHex = BASE_COLORS[baseChar] || '#ffffff';
      
      // Calculate inward vector toward central Y-axis
      const inwardDir = new THREE.Vector3(-x, 0, -z).normalize();
      
      const stemLength = 0.4;
      const headPos = inwardDir.clone().multiplyScalar(stemLength);
      const stemPos = inwardDir.clone().multiplyScalar(stemLength / 2);

      // Quaternion to align standard cylinder (Y-axis) with inwardDir
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, inwardDir);

      basePairs.push({
          backbonePos: pos,
          headPos,
          stemPos,
          quaternion,
          stemLength,
          color: new THREE.Color(colorHex)
      });
    }
    
    return { backbonePoints: backbone, basePoints: basePairs };
  }, [sequence]); // update if sequence changes

  if (!visible) return null;

  return (
    <group {...props}>
      <group ref={groupRef}>
        {/* The Backbone - a chain of small spheres */}
        {backbonePoints.map((pos, i) => (
          <mesh key={`bb-${i}`} position={pos}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshPhysicalMaterial color="#888888" roughness={0.4} metalness={0.5} />
          </mesh>
      ))}

      {/* The Bases attached to the backbone */}
      {basePoints.map((base, i) => (
        <group key={`base-${i}`} position={base.backbonePos}>
          {/* Stem connecting to center */}
          <mesh position={base.stemPos} quaternion={base.quaternion}>
             <cylinderGeometry args={[0.04, 0.04, base.stemLength, 8]} />
             <meshPhysicalMaterial color={base.color} roughness={0.5} emissive={base.color} emissiveIntensity={0.5} />
          </mesh>
          {/* The Nucleotide Base Head (Small Sphere) */}
          <mesh position={base.headPos}>
             <sphereGeometry args={[0.15, 16, 16]} />
             <meshPhysicalMaterial color={base.color} roughness={0.5} emissive={base.color} emissiveIntensity={0.8} />
          </mesh>
        </group>
        ))}
      </group>
    </group>
  );
};

export default RnaHelix;
