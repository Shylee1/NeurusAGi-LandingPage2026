import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AmbientPlasmaMesh } from "./AmbientPlasmaMesh";

interface AmbientSceneProps {
  className?: string;
}

export default function AmbientScene({ className = "" }: AmbientSceneProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ filter: "brightness(1.1) saturate(1.2)" }}>
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "default",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, 1]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <AmbientPlasmaMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
