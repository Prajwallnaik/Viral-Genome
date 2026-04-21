import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

/**
 * Spike — biologically-accurate trimeric spike protein
 *
 * Anatomy (base → tip):
 *   1. Anchor foot   – wide flared base that merges into the envelope
 *   2. Stalk         – slender flexible neck (tapered cylinder)
 *   3. S2 domain     – slightly thicker mid-section (coiled-coil)
 *   4. S1 head       – organically distorted blob trimer (receptor-binding domain)
 *
 * Alignment: the group Y-axis is oriented along the outward surface normal via quaternion.
 * A per-spike phase offset gives each spike an independent oscillation → organic wave.
 */

export default function Spike({ radius, phi, theta, stemColor, headColor, type = 'standard', spikeIndex = 0 }) {
  const groupRef = useRef();

  // ── Position & orientation on sphere surface ──────────────────────────────
  const { position, quaternion } = useMemo(() => {
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const pos = new THREE.Vector3(x, y, z);
    const normal = pos.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, normal);
    return { position: pos, quaternion: quat };
  }, [radius, phi, theta]);

  // Per-spike phase so they breathe at different times
  const phase = useMemo(() => spikeIndex * 0.37, [spikeIndex]);


  const isNA = type === 'NA';

  // ── Geometry sizing ───────────────────────────────────────────────────────
  const anchorR  = isNA ? 0.14 : 0.18;  // flared base
  const stalkR   = isNA ? 0.055 : 0.07; // narrow neck
  const stalkH   = isNA ? 0.5  : 0.6;
  const s2R      = isNA ? 0.07 : 0.09;  // S2 coiled-coil
  const s2H      = isNA ? 0.3  : 0.35;
  const headR    = isNA ? 0.18 : 0.24;  // RBD head blob

  const totalH   = stalkH + s2H;        // offset of head centre above root

  // Stem color — slightly warm grey with the virus tint
  const stemMat  = { color: stemColor || '#cccccc', roughness: 0.55, metalness: 0.3 };
  // Head emissive glow
  const headMat  = { color: headColor || '#ff4a6e', emissive: headColor || '#ff4a6e', emissiveIntensity: 0.4, roughness: 0.2, metalness: 0.1 };

  return (
    <group position={position} quaternion={quaternion}>

      {/* ── 1. Anchor / Foot ── spread-out flare fusing into envelope */}
      <mesh position={[0, anchorR * 0.3, 0]}>
        <cylinderGeometry args={[stalkR, anchorR, anchorR * 1.4, 16, 1, false]} />
        <meshPhysicalMaterial
          {...stemMat}
          transparent opacity={0.8}
          clearcoat={0.4} clearcoatRoughness={0.3}
        />
      </mesh>

      {/* ── 2. Stalk (flexible neck) ── */}
      <mesh position={[0, anchorR * 1.0 + stalkH / 2, 0]}>
        <cylinderGeometry args={[stalkR * 0.9, stalkR, stalkH, 12, 4, false]} />
        <meshPhysicalMaterial
          {...stemMat}
          clearcoat={0.6} clearcoatRoughness={0.25}
        />
      </mesh>

      {/* ── 3. S2 Domain (coiled-coil — thicker, with subtle facets) ── */}
      <mesh position={[0, anchorR * 1.0 + stalkH + s2H / 2, 0]}>
        <cylinderGeometry args={[s2R, stalkR * 0.9, s2H, 10, 2, false]} />
        <meshPhysicalMaterial
          {...stemMat}
          clearcoat={0.5}
          color={new THREE.Color(stemColor || '#cccccc').lerp(new THREE.Color(headColor || '#ff4a6e'), 0.25)}
        />
      </mesh>

      {/* ── 4. RBD Head — organic blob (MeshDistortMaterial for living feel) ── */}
      <mesh position={[0, anchorR * 1.0 + totalH + headR * 0.8, 0]}>
        <sphereGeometry args={[headR, 32, 32]} />
        <MeshDistortMaterial
          {...headMat}
          distort={0.18}   // organic surface wobble
          speed={3.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* ── 5. Receptor-binding tips — 3 tiny buds on the head (trimeric nature) ── */}
      {!isNA && [0, 1, 2].map(i => {
        const angle = (i / 3) * Math.PI * 2;
        const bx = Math.cos(angle) * headR * 0.6;
        const bz = Math.sin(angle) * headR * 0.6;
        const by = anchorR * 1.0 + totalH + headR * 1.55;
        return (
          <mesh key={i} position={[bx, by, bz]}>
            <sphereGeometry args={[headR * 0.28, 16, 16]} />
            <meshPhysicalMaterial
              color={headColor || '#ff4a6e'}
              emissive={headColor || '#ff4a6e'}
              emissiveIntensity={0.6}
              roughness={0.15}
              clearcoat={1}
            />
          </mesh>
        );
      })}

      {/* ── NA-type: flat 4-petal mushroom cap instead ── */}
      {isNA && (
        <mesh position={[0, anchorR * 1.0 + totalH + headR, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[headR * 1.4, headR * 0.5, headR * 0.35, 16]} />
          <meshPhysicalMaterial
            color={headColor || '#ffcc33'}
            emissive={headColor || '#ffcc33'}
            emissiveIntensity={0.4}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
      )}

      {/* ── Soft glow halo around RBD head ── */}
      <mesh position={[0, anchorR * 1.0 + totalH + headR * 0.8, 0]}>
        <sphereGeometry args={[headR * 1.55, 16, 16]} />
        <meshPhysicalMaterial
          color={headColor || '#ff4a6e'}
          emissive={headColor || '#ff4a6e'}
          emissiveIntensity={0.15}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* ── Internal spike ref (animated oscillating stem) ── */}
      <SpikeOscillatorRef groupRef={groupRef} phase={phase} />
    </group>
  );
}

// Separating the animation ref to avoid hook violations inside conditionals
function SpikeOscillatorRef({ groupRef, phase }) {
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime + phase;
    groupRef.current.rotation.x = Math.sin(t * 1.1) * 0.05;
    groupRef.current.rotation.z = Math.cos(t * 0.85) * 0.05;
  });
  return null;
}
