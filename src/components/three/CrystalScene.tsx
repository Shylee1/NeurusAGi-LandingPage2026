import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HoloCrystal } from "./HoloCrystal";

interface CrystalSceneProps {
  color: string;
  index: number;
  className?: string;
}

export default function CrystalScene({ color, index, className = "" }: CrystalSceneProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ filter: "brightness(1.2) saturate(1.5)" }}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[2, 3, 2]} intensity={3} color={color} />
          <pointLight position={[-2, -2, -2]} intensity={1.5} color="#d4a853" />
          <HoloCrystal color={color} index={index} />
        </Suspense>
      </Canvas>
    </div>
  );
}
