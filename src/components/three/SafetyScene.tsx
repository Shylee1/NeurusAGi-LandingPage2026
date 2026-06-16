import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { SafetyContainment } from "./SafetyContainment";

interface SafetySceneProps {
  className?: string;
}

export default function SafetyScene({ className = "" }: SafetySceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
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
          <EffectComposer>
            <Bloom
              intensity={2.5}
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
