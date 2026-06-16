import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { DataStreamField } from "./DataStreamField";

interface DataStreamSceneProps {
  className?: string;
}

export default function DataStreamScene({ className = "" }: DataStreamSceneProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ filter: "brightness(1.15) saturate(1.3)" }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <DataStreamField />
        </Suspense>
      </Canvas>
    </div>
  );
}
