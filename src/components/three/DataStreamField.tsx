import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STRAND_COUNT = 60;
const POINTS_PER_STRAND = 40;

const strandVertexShader = `
  attribute float aPhase;
  attribute float aAmplitude;
  attribute float aSpeed;
  attribute float aOffset;

  uniform float uTime;
  uniform float uProgress;

  varying float vAlpha;
  varying float vPhase;

  void main() {
    float t = uTime * aSpeed + aPhase;
    float waveX = sin(position.y * 3.0 + t) * aAmplitude * 0.3;
    float waveZ = cos(position.y * 2.5 + t * 0.7) * aAmplitude * 0.2;

    vec3 displaced = position + vec3(waveX, 0.0, waveZ);

    float progress = fract(position.y * 0.1 + uTime * aSpeed * 0.15 + aOffset);
    vAlpha = sin(progress * 3.14159) * 0.85;
    vPhase = aPhase;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    gl_PointSize = (1.5 + aAmplitude * 2.0) * (1.0 / -modelViewMatrix[3][2] * 80.0);
    gl_PointSize = clamp(gl_PointSize, 0.5, 3.5);
  }
`;

const strandFragmentShader = `
  uniform float uTime;
  varying float vAlpha;
  varying float vPhase;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float soft = 1.0 - smoothstep(0.2, 0.5, dist);

    float hue = fract(vPhase * 0.15 + uTime * 0.05);
    vec3 teal = vec3(0.047, 0.812, 0.690);
    vec3 gold = vec3(0.831, 0.659, 0.325);
    vec3 cyan = vec3(0.102, 1.0, 0.847);
    vec3 color = mix(teal, gold, sin(hue * 6.28) * 0.5 + 0.5);
    color = mix(color, cyan, cos(hue * 6.28 + 1.0) * 0.3 + 0.3);

    gl_FragColor = vec4(color, vAlpha * soft * 0.6);
  }
`;

function DataStrand({ index, total }: { index: number; total: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, uniforms } = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 2.5 + (Math.random() - 0.5) * 2.0;

    const positions: number[] = [];
    const phases: number[] = [];
    const amplitudes: number[] = [];
    const speeds: number[] = [];
    const offsets: number[] = [];

    const baseX = Math.cos(angle) * radius;
    const baseZ = Math.sin(angle) * radius;

    for (let j = 0; j < POINTS_PER_STRAND; j++) {
      const y = -5 + (j / (POINTS_PER_STRAND - 1)) * 10;
      positions.push(baseX, y, baseZ);
      phases.push(angle + Math.random() * 0.5);
      amplitudes.push(0.2 + Math.random() * 0.8);
      speeds.push(0.3 + Math.random() * 0.4);
      offsets.push(Math.random());
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));
    geo.setAttribute("aAmplitude", new THREE.Float32BufferAttribute(amplitudes, 1));
    geo.setAttribute("aSpeed", new THREE.Float32BufferAttribute(speeds, 1));
    geo.setAttribute("aOffset", new THREE.Float32BufferAttribute(offsets, 1));

    const uni = { uTime: { value: 0 }, uProgress: { value: 0 } };
    return { geometry: geo, uniforms: uni };
  }, [index, total]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={strandVertexShader}
        fragmentShader={strandFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function DataStreamField() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: STRAND_COUNT }, (_, i) => (
        <DataStrand key={i} index={i} total={STRAND_COUNT} />
      ))}
    </group>
  );
}
