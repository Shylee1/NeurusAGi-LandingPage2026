import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { QuantumOrb } from "./QuantumOrb";
import { QuantumField } from "./QuantumField";

function EnvironmentLights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} intensity={2.5} color="#0ccfb0" />
      <pointLight position={[-3, -2, -3]} intensity={1.8} color="#d4a853" />
      <pointLight position={[0, 4, -2]} intensity={1.2} color="#1affd8" />
    </>
  );
}

function EnergyRing({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  const curve = new THREE.TorusGeometry(radius, 0.006, 8, 128);

  return (
    <mesh ref={ref} rotation={[tilt, tilt * 0.3, 0]} geometry={curve}>
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <EnvironmentLights />
      <QuantumOrb position={[0, 0, 0]} scale={1.4} />
      <QuantumField count={600} radius={3.2} />
      <EnergyRing radius={2.1} speed={0.3} tilt={Math.PI / 4} color="#0ccfb0" />
      <EnergyRing radius={2.6} speed={-0.2} tilt={Math.PI / 3} color="#d4a853" />
      <EnergyRing radius={1.7} speed={0.5} tilt={Math.PI / 6} color="#1affd8" />
    </>
  );
}

interface HeroSceneProps {
  className?: string;
  reducedMotion?: boolean;
}

export default function HeroScene({ className = "", reducedMotion = false }: HeroSceneProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ filter: reducedMotion ? "none" : "brightness(1.15) saturate(1.3)" }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
