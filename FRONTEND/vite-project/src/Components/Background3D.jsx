import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);

    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return reduced;
}

function RotatingTorus({ reducedMotion }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    if (reducedMotion) return;

    mesh.rotation.x += delta * 0.16;
    mesh.rotation.y += delta * 0.24;
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[1.6, 0.55, 16, 64]} />
      <meshStandardMaterial
        color="#6C5CE7"
        emissive="#6C5CE7"
        emissiveIntensity={0.65}
        metalness={0.15}
        roughness={0.7}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export default function Background3D() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 5]} intensity={0.75} />
      <Stars radius={50} depth={20} count={1200} factor={4} fade saturation={0.7} />
      <RotatingTorus reducedMotion={reducedMotion} />
    </Canvas>
  );
}

