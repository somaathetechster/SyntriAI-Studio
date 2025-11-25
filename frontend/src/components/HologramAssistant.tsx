"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function HologramCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x = Math.sin(t / 2) * 0.25;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#22c55e"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function HologramAssistant() {
  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-30 h-28 w-28 rounded-full border border-sky-500/40 bg-slate-950/70 shadow-lg shadow-sky-500/40 backdrop-blur-sm hidden sm:block">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 40 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 3]} intensity={1.4} color="#38bdf8" />
        <HologramCore />
      </Canvas>
      <div className="pointer-events-none absolute -bottom-6 left-1/2 w-40 -translate-x-1/2 text-[10px] text-center text-sky-200/90">
        SyntriAI is thinking with you
      </div>
    </div>
  );
}
