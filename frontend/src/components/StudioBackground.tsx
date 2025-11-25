"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SpinningCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y += 0.004;
    ref.current.rotation.x = Math.sin(t / 3) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          wireframe
          color="#38bdf8"
          emissive="#0f172a"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

function ParticlesField() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 4.5 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <Points
      ref={ref}
      positions={sphere}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        transparent
        color="#22d3ee"
        opacity={0.4}
      />
    </Points>
  );
}

export default function StudioBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.8]}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          intensity={1.0}
          position={[4, 4, 2]}
          color="#38bdf8"
        />
        <SpinningCore />
        <ParticlesField />
      </Canvas>
      {/* Gradient overlay for extra depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.16),_transparent_55%)]" />
    </div>
  );
}
