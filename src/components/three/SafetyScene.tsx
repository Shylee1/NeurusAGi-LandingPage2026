import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { SafetyContainment } from "./SafetyContainment";

interface SafetySceneProps {
  className?: string;
}

export default function SafetyScene({ className = "" }: SafetySceneProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ filter: "brightness(1.2) saturate(1.4)" }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <SafetyContainment />
        </Suspense>
      </Canvas>
    </div>
  );
}
