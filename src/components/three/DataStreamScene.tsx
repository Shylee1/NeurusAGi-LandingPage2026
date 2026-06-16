import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { DataStreamField } from "./DataStreamField";

interface DataStreamSceneProps {
  className?: string;
}

export default function DataStreamScene({ className = "" }: DataStreamSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <DataStreamField />
          <EffectComposer>
            <Bloom
              intensity={1.8}
              luminanceThreshold={0.05}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
