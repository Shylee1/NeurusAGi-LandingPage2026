import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const containmentVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vFresnel;

  void main() {
    vPosition = position;
    vec3 worldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vec3 viewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
    vFresnel = pow(1.0 - max(dot(worldNormal, viewDir), 0.0), 4.0);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const containmentFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vFresnel;

  void main() {
    // Animated containment grid lines
    float gridV = step(0.95, fract(vPosition.y * 10.0 + uTime * 0.4));
    float gridH = step(0.95, fract(atan(vPosition.z, vPosition.x) / (3.14159 * 2.0) * 16.0 + uTime * 0.2));
    float grid = max(gridV, gridH) * 0.5;

    // Pulsing energy
    float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + length(vPosition) * 4.0);

    vec3 color = uColor * (0.3 + grid * 0.7 + vFresnel * 0.8 + pulse * 0.1);
    float alpha = (vFresnel * 0.7 + grid * 0.4 + 0.05) * 0.9;

    gl_FragColor = vec4(color, alpha);
  }
`;

function ContainmentSphere({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
  }), [color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    meshRef.current.rotation.y += speed * 0.003;
    meshRef.current.rotation.x += speed * 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 48, 48]} />
      <shaderMaterial
        vertexShader={containmentVertexShader}
        fragmentShader={containmentFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.28, 2]} />
      <meshStandardMaterial
        color="#0ccfb0"
        emissive="#0ccfb0"
        emissiveIntensity={2.5}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function ScanRing({ y, radius, speed }: { y: number; radius: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={meshRef} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 4, 64]} />
      <meshBasicMaterial color="#0ccfb0" transparent opacity={0.45} />
    </mesh>
  );
}

export function SafetyContainment() {
  return (
    <group>
      <pointLight position={[0, 0, 0]} intensity={2} color="#0ccfb0" distance={5} />
      <pointLight position={[2, 2, 0]} intensity={0.8} color="#d4a853" distance={4} />
      <ContainmentSphere radius={1.6} color="#0ccfb0" speed={1} />
      <ContainmentSphere radius={1.15} color="#d4a853" speed={-1.4} />
      <ScanRing y={0} radius={1.6} speed={0.4} />
      <ScanRing y={0.4} radius={1.52} speed={-0.3} />
      <ScanRing y={-0.4} radius={1.52} speed={0.5} />
      <CoreOrb />
    </group>
  );
}
