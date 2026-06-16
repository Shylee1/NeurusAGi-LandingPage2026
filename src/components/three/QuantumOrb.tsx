import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uStrength;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    vec3 p = position;
    float t = uTime * 0.4;

    // Multi-octave noise for organic morphing
    float n1 = snoise(p * 1.2 + vec3(t * 0.7, t * 0.5, t * 0.3));
    float n2 = snoise(p * 2.8 + vec3(-t * 0.4, t * 0.8, -t * 0.6)) * 0.5;
    float n3 = snoise(p * 5.5 + vec3(t * 0.3, -t * 0.7, t * 0.9)) * 0.25;

    float displacement = (n1 + n2 + n3) * uStrength;
    vDisplacement = displacement;

    vec3 displaced = p + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    vNormal = normalize(normalMatrix * (normal + normalize(p) * displacement * 0.3));
    vPosition = displaced;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    // View-space fresnel
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.5);

    // Iridescent color shift based on normal angle + time
    float angle = dot(vNormal, normalize(vec3(1.0, 1.0, 0.5)));
    float t = uTime * 0.25;

    // Rainbow iridescence using sine wave color bands
    float r = 0.5 + 0.5 * sin(angle * 4.0 + t * 1.1 + vDisplacement * 8.0);
    float g = 0.5 + 0.5 * sin(angle * 4.0 + t * 1.3 + vDisplacement * 8.0 + 2.094);
    float b = 0.5 + 0.5 * sin(angle * 4.0 + t * 1.7 + vDisplacement * 8.0 + 4.189);

    vec3 iridescentColor = vec3(r, g, b);

    // Blend base teal/gold with iridescent sheen
    float colorMix = 0.5 + 0.5 * sin(vDisplacement * 5.0 + t);
    vec3 baseColor = mix(uColorA, uColorB, colorMix);
    vec3 finalColor = mix(baseColor, iridescentColor, fresnel * 0.7 + 0.1);

    // Gold specular highlight
    float spec = pow(max(dot(reflect(-viewDir, vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 32.0);
    finalColor += uColorC * spec * 0.4;

    // Edge glow
    float edge = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 6.0);
    finalColor += uColorA * edge * 1.5;

    // Displacement-based intensity variation
    float intensity = 0.6 + 0.4 * smoothstep(-0.3, 0.3, vDisplacement);
    finalColor *= intensity;

    gl_FragColor = vec4(finalColor, 0.88 + fresnel * 0.12);
  }
`;

interface QuantumOrbProps {
  position?: [number, number, number];
  scale?: number;
  interactive?: boolean;
}

export function QuantumOrb({ position = [0, 0, 0], scale = 1, interactive = true }: QuantumOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uStrength: { value: 0.38 },
    uColorA: { value: new THREE.Color("#0ccfb0") },
    uColorB: { value: new THREE.Color("#1affd8") },
    uColorC: { value: new THREE.Color("#d4a853") },
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;

    if (interactive) {
      const targetX = state.mouse.y * 0.12;
      const targetY = state.mouse.x * 0.12;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
    }

    meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
