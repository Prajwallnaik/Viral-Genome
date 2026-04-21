import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Sphere, Cylinder, Dodecahedron, Cone, Tube, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import RnaHelix from './RnaHelix';
import Spike from './Spike';

// Helper to generate N spikes randomly distributed using spherical math
const generateSpikeData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();
      data.push({ phi, theta });
  }
  return data;
};

function VirusModels({ virus, sequence, rnaVisible, speed, showShell }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.1 * speed;
      groupRef.current.rotation.y += delta * 0.15 * speed;
    }
  });

  // Memoize materials to prevent recreating them on every sequence change (1s)
  const envelopeProps = useMemo(() => ({
    color: virus.color,
    emissive: virus.color,
    emissiveIntensity: 0.1,
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    thickness: 2.0,
    transmission: 0.6,
    transparent: true,
    depthWrite: false, 
  }), [virus.color]);

  // A biological animated material for lipid envelopes (like Corona, Ebola, Flu)
  const OrganicEnvelope = ({ isWireframe = false, opacityMultiplier = 1 }) => (
    <MeshDistortMaterial 
      {...envelopeProps} 
      opacity={showShell ? (0.7 * opacityMultiplier) : 0} 
      distort={0.15} // subtle vertex wobble to mimic lipid bilayer movement
      speed={2} // pulsating speed
      wireframe={isWireframe}
    />
  );

  // A rigid biological crystal material for non-enveloped capsids (like Rhino, Zika)
  const CrystallineEnvelope = ({ isWireframe = false, opacityMultiplier = 1 }) => (
    <MeshTransmissionMaterial 
      {...envelopeProps} 
      opacity={showShell ? (0.8 * opacityMultiplier) : 0} 
      transmission={0.8}
      ior={1.2}
      chromaticAberration={0.04}
      anisotropy={0.2}
      wireframe={isWireframe}
    />
  );

  // Memoize generative geometry data so they don't randomly regenerate every 1 second
  const generatedData = useMemo(() => {
    return {
      sarsSpikes: generateSpikeData(50),
      haSpikes: generateSpikeData(40),
      naSpikes: generateSpikeData(20),
      hivSpikes: generateSpikeData(15),
      measlesSpikes: generateSpikeData(30),
      ebolaCurve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, 2, 0),
        new THREE.Vector3(-1, 0, 1),
        new THREE.Vector3(0, -1.5, 0),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(2, 2, 0)
      ])
    };
  }, []);

  const renderShape = () => {
    switch (virus.shape) {
      case 'spherical_spikes': {
        return (
          <group>
            {/* Main Envelope Sphere */}
            <Sphere args={[2, 64, 64]}>
               <OrganicEnvelope />
            </Sphere>
            {generatedData.sarsSpikes.map((s, i) => (
              <Spike 
                key={i} 
                spikeIndex={i}
                radius={2} 
                phi={s.phi} 
                theta={s.theta} 
                stemColor="#dddddd"
                headColor="#ff4a6e" 
                type="standard"
              />
            ))}
          </group>
        );
      }

      case 'spherical_bumped': { // Influenza A (HA and NA spikes)
        return (
          <group scale={[1, 1.1, 1]}> {/* Ovoid variation via scale */}
            <Sphere args={[2, 48, 48]}>
                <OrganicEnvelope />
            </Sphere>
            {/* HA Spikes (Hemagglutinin) */}
            {generatedData.haSpikes.map((s, i) => (
              <Spike key={`ha-${i}`} spikeIndex={i} radius={2} {...s} headColor="#33ccff" stemColor="#c0c0c0" type="standard" />
            ))}
            {/* NA Spikes (Neuraminidase — mushroom cap) */}
            {generatedData.naSpikes.map((s, i) => (
              <Spike key={`na-${i}`} spikeIndex={i + 40} radius={2} {...s} headColor="#ffcc33" stemColor="#c0c0c0" type="NA" />
            ))}
          </group>
        );
      }

      case 'spherical_conical': { // HIV-1
        return (
          <group>
            <Sphere args={[2.5, 64, 64]}>
               <OrganicEnvelope opacityMultiplier={0.8} />
            </Sphere>
            {/* Sparse Spikes */}
            {generatedData.hivSpikes.map((s, i) => (
              <Spike key={i} spikeIndex={i} radius={2.5} {...s} headColor="#cc33ff" stemColor="#c0c0c0" />
            ))}
            {/* Inner Conical Core */}
            <Cone args={[0.8, 2.2, 32]} rotation={[Math.PI / 4, 0, 0]}>
              <meshStandardMaterial 
                 color="#aaaaaa" 
                 roughness={0.8} 
                 metalness={0.2} 
                 transparent={true}
                 opacity={showShell ? 0.8 : 0.0}
                 depthWrite={true}
              />
            </Cone>
          </group>
        );
      }

      case 'filamentous': { // Ebola (Tube along CatmullRomCurve3)
        return (
          <group>
            <Tube args={[generatedData.ebolaCurve, 64, 0.4, 32, false]}>
               <OrganicEnvelope />
            </Tube>
          </group>
        );
      }

      case 'spherical_smooth': { // Hepatitis C
        return (
          <group>
            <Sphere args={[2.2, 64, 64]}>
               <OrganicEnvelope />
            </Sphere>
            {/* Subtle wireframe overlay for texture */}
            <Sphere args={[2.21, 32, 32]}>
               <OrganicEnvelope isWireframe={true} opacityMultiplier={0.3} />
            </Sphere>
          </group>
        );
      }

      case 'icosahedral': // Rhinovirus
        return (
          <group>
            <Icosahedron args={[2.5, 2]}>
               <CrystallineEnvelope />
            </Icosahedron>
            {/* Edges representation via wireframe variant */}
            <Icosahedron args={[2.51, 2]}>
               <CrystallineEnvelope isWireframe={true} opacityMultiplier={0.25} />
            </Icosahedron>
          </group>
        );

      case 'bullet': // Rabies (bullet shape = cylinder + sphere cap)
        return (
          <group>
            {/* Cylinder Body */}
            <Cylinder args={[1.5, 1.5, 3, 32]} position={[0, -0.5, 0]}>
              <OrganicEnvelope />
            </Cylinder>
            {/* Rounded Head */}
            <Sphere args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 1.0, 0]}>
              <OrganicEnvelope />
            </Sphere>
            {/* Flat Back Cap */}
            <mesh position={[0, -2, 0]} rotation={[Math.PI/2, 0, 0]}>
                <circleGeometry args={[1.5, 32]} />
                <OrganicEnvelope />
            </mesh>
          </group>
        );

      case 'pleomorphic': { // Measles (deformed sphere using noise/random)
        return (
          <group scale={[1.1, 0.9, 1.05]}> {/* Asymmetrical Scale to fake pleomorphic */}
             <Sphere args={[2.3, 64, 64]}>
                <OrganicEnvelope distort={0.2} /> {/* More wobble for pleomorphic */}
             </Sphere>
             {generatedData.measlesSpikes.map((s, i) => (
                <Spike key={i} spikeIndex={i} radius={2.3} {...s} headColor="#ff99cc" stemColor="#c0c0c0" />
             ))}
          </group>
        );
      }

      case 'icosahedral_detailed': // Zika and Dengue
        return (
          <group>
            {/* Smooth shaded Icosahedron via higher detail arg = 3 */}
            <Icosahedron args={[2.3, 3]}>
               <CrystallineEnvelope />
            </Icosahedron>
            <Icosahedron args={[2.32, 1]}>
               <CrystallineEnvelope isWireframe={true} opacityMultiplier={0.3} />
            </Icosahedron>
          </group>
        );

      default:
        return (
          <Sphere args={[2, 64, 64]}>
             <OrganicEnvelope />
          </Sphere>
        );
    }
  };

  const getRnaProps = () => {
    switch (virus.shape) {
      case 'spherical_conical':
        return { scale: [0.6, 0.45, 0.6], rotation: [Math.PI / 4, 0, 0] };
      case 'bullet':
        return { scale: [0.85, 0.65, 0.85], position: [0, 0.25, 0] };
      case 'filamentous':
        // Extremely tiny scale to fit inside a curvy tube
        return { scale: [0.22, 0.4, 0.22] };
      case 'icosahedral_detailed':
      case 'pleomorphic':
      case 'spherical_bumped':
        return { scale: [1, 0.8, 1] };
      default:
        // Safely fits inside radius 2 sphere (max height = 4. 0.8 * 4 = 3.2 <= 4)
        return { scale: [1, 0.8, 1] };
    }
  };

  return (
    <group ref={groupRef}>
      {showShell && renderShape()}
      {/* Interior RNA */}
      <RnaHelix sequence={sequence} visible={rnaVisible} speed={speed} {...getRnaProps()} />
    </group>
  );
}

export default VirusModels;
