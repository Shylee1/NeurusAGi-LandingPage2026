import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const crystalVertexShader = `
  uniform float uTime;
  uniform float uMorph;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vFresnel;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);

    // View direction for fresnel
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec3 viewDir = normalize(cameraPosition - worldPos.xyz);
    vFresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);

    // Breathing / pulsing displacement
    float pulse = sin(uTime * 1.4 + length(position) * 3.0) * 0.04 * uMorph;
    vec3 displaced = position + normal * pulse;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const crystalFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uMorph;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vFresnel;

  void main() {
    // Holographic color bands
    float bands = sin(vPosition.y * 12.0 + uTime * 1.8) * 0.5 + 0.5;
    float scan = step(0.97, fract(vPosition.y * 8.0 + uTime * 0.5)) * 0.3;

    // Iridescent rim
    vec3 rimColor = mix(uColor, vec3(1.0, 0.9, 0.5), vFresnel * 0.6);

    // Core holographic tint
    vec3 holoColor = mix(uColor * 0.5, rimColor, bands * 0.3 + 0.7);
    holoColor += vec3(scan);

    // Depth variation
    float depth = smoothstep(-1.0, 1.0, vPosition.z);
    holoColor = mix(holoColor * 0.6, holoColor, depth);

    float alpha = 0.55 + vFresnel * 0.35 + scan;
    gl_FragColor = vec4(holoColor, alpha);
  }
`;

interface HoloCrystalProps {
  color: string;
  index: number;
}

const GEOMETRIES = ["dodecahedron", "octahedron", "tetrahedron"] as const;

export function HoloCrystal({ color, index }: HoloCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uMorph: { value: 1.0 },
  }), [color]);

  const geometry = useMemo(() => {
    if (index === 0) return new THREE.DodecahedronGeometry(1.1, 0);
    if (index === 1) return new THREE.OctahedronGeometry(1.2, 1);
    return new THREE.TetrahedronGeometry(1.2, 2);
  }, [index]);

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.002;
    wireRef.current.rotation.copy(meshRef.current.rotation);
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <shaderMaterial
          vertexShader={crystalVertexShader}
          fragmentShader={crystalFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}
