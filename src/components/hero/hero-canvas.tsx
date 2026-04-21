"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function LiquidPlane() {
  const geoRef = useRef<THREE.PlaneGeometry | null>(null);
  const baseRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!geoRef.current) return;
    const pos = geoRef.current.attributes.position as THREE.BufferAttribute;
    baseRef.current = pos.array.slice() as Float32Array;
  }, []);

  useFrame(({ clock, pointer }) => {
    const geo = geoRef.current;
    const base = baseRef.current;
    if (!geo || !base) return;

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const t = clock.getElapsedTime();

    const mx = pointer.x * 0.5 + 0.5;
    const my = pointer.y * 0.5 + 0.5;

    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];

      const u = (x / 7.4) * 0.5 + 0.5;
      const v = (y / 4.6) * 0.5 + 0.5;
      const d = Math.hypot(u - mx, v - my);
      const influence = 1 - THREE.MathUtils.smoothstep(d, 0.08, 0.6);

      const w =
        Math.sin((x * 0.85 + t * 0.85) * 1.2) * 0.08 +
        Math.cos((y * 0.95 - t * 0.75) * 1.35) * 0.06 +
        Math.sin((x + y + t * 0.7) * 1.15) * 0.05;

      const ripple = Math.sin(d * 16 - t * 3.2) * 0.08 * influence;
      arr[i + 2] = w + ripple;
    }

    pos.needsUpdate = true;
    if ((clock.elapsedTime * 60) % 2 < 1) geo.computeVertexNormals();
  });

  return (
    <mesh rotation-x={-Math.PI * 0.08} position={[0, 0.05, 0]}>
      <planeGeometry ref={geoRef} args={[7.4, 4.6, 140, 90]} />
      <meshPhysicalMaterial
        color="#0a0b12"
        emissive="#2e6bff"
        emissiveIntensity={0.35}
        roughness={0.22}
        metalness={0.14}
        clearcoat={1}
        clearcoatRoughness={0.28}
        transparent
        opacity={0.92}
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const points = useMemo(() => {
    const count = 520;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const a = new THREE.Color("#8a2eff");
    const b = new THREE.Color("#2df2ff");
    const rand = mulberry32(901);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (rand() - 0.5) * 8.0;
      pos[i3 + 1] = (rand() - 0.5) * 5.0;
      pos[i3 + 2] = (rand() - 0.5) * 3.2;

      const t = rand();
      const c = a.clone().lerp(b, t);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { pos, col };
  }, []);

  const mat = useMemo(() => {
    const m = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    return m;
  }, []);

  return (
    <points frustumCulled={false} material={mat}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points.pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[points.col, 3]} />
      </bufferGeometry>
    </points>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.3], fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 2.4, 9.6]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[2, 2, 2]} intensity={0.55} />
        <group position={[0, -0.1, 0]}>
          <Float speed={0.7} rotationIntensity={0.06} floatIntensity={0.22}>
            <LiquidPlane />
            <FloatingParticles />
          </Float>
        </group>
      </Canvas>
    </div>
  );
}
