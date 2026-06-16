import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { AmbientPlasmaMesh } from "./AmbientPlasmaMesh";

interface AmbientSceneProps {
  className?: string;
}

export default function AmbientScene({ className = "" }: AmbientSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
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
          <EffectComposer>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
