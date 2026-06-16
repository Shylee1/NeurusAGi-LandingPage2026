import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vPhase;

  // Curl noise for fluid motion
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

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
    vec4 p = permute(permute(permute(i.z+vec4(0,i1.z,i2.z,1))+i.y+vec4(0,i1.y,i2.y,1))+i.x+vec4(0,i1.x,i2.x,1));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0*floor(p*ns.z*ns.z);
    vec4 x_ = floor(j*ns.z);
    vec4 y_ = floor(j - 7.0*x_);
    vec4 x = x_*ns.x + ns.yyyy;
    vec4 y = y_*ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy,y.xy);
    vec4 b1 = vec4(x.zw,y.zw);
    vec4 s0 = floor(b0)*2.0+1.0;
    vec4 s1 = floor(b1)*2.0+1.0;
    vec4 sh = -step(h,vec4(0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m; return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  vec3 curlNoise(vec3 p) {
    float eps = 0.1;
    float n1,n2,a,b;
    n1=snoise(vec3(p.x,p.y+eps,p.z)); n2=snoise(vec3(p.x,p.y-eps,p.z)); a=(n1-n2)/(2.0*eps);
    n1=snoise(vec3(p.x,p.y,p.z+eps)); n2=snoise(vec3(p.x,p.y,p.z-eps)); b=(n1-n2)/(2.0*eps);
    float cx=a-b;
    n1=snoise(vec3(p.x,p.y,p.z+eps)); n2=snoise(vec3(p.x,p.y,p.z-eps)); a=(n1-n2)/(2.0*eps);
    n1=snoise(vec3(p.x+eps,p.y,p.z)); n2=snoise(vec3(p.x-eps,p.y,p.z)); b=(n1-n2)/(2.0*eps);
    float cy=a-b;
    n1=snoise(vec3(p.x+eps,p.y,p.z)); n2=snoise(vec3(p.x-eps,p.y,p.z)); a=(n1-n2)/(2.0*eps);
    n1=snoise(vec3(p.x,p.y+eps,p.z)); n2=snoise(vec3(p.x,p.y-eps,p.z)); b=(n1-n2)/(2.0*eps);
    float cz=a-b;
    return vec3(cx,cy,cz);
  }

  void main() {
    vPhase = aPhase;
    float t = uTime * aSpeed * 0.15;

    // Curl-noise driven particle flow — organic fluid motion, not grid/network
    vec3 curl = curlNoise(position * 0.5 + vec3(t * 0.3, t * 0.2, t * 0.4));
    vec3 pos = position + curl * 0.8;

    // Subtle spherical containment pull
    float dist = length(pos);
    if (dist > 4.0) pos = normalize(pos) * 4.0;

    // Breathing scale
    float breathe = 0.85 + 0.15 * sin(uTime * 0.7 + aPhase * 6.28);

    vec4 mvPos = modelViewMatrix * vec4(pos * breathe, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // Distance-based fade
    float fadeDist = smoothstep(5.0, 1.5, dist);
    vAlpha = fadeDist * (0.4 + 0.6 * sin(uTime * 1.2 + aPhase * 12.0) * 0.5 + 0.5);

    gl_PointSize = aSize * uPixelRatio * (250.0 / -mvPos.z);
  }
`;

const particleFragmentShader = `
  uniform float uTime;
  varying float vAlpha;
  varying float vPhase;

  void main() {
    // Soft circle point sprite
    vec2 coord = gl_PointCoord - vec2(0.5);
    float r = length(coord);
    if (r > 0.5) discard;

    float softEdge = smoothstep(0.5, 0.1, r);

    // Color shift between teal and gold based on phase
    float t = uTime * 0.3 + vPhase * 6.28;
    float colorBlend = 0.5 + 0.5 * sin(t);
    vec3 colorA = vec3(0.047, 0.812, 0.69);   // teal
    vec3 colorB = vec3(0.831, 0.659, 0.325);  // gold
    vec3 color = mix(colorA, colorB, colorBlend * 0.4);

    gl_FragColor = vec4(color, softEdge * vAlpha * 0.75);
  }
`;

interface QuantumFieldProps {
  count?: number;
  radius?: number;
}

export function QuantumField({ count = 800, radius = 3.5 }: QuantumFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes, phases, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical distribution with bias toward surface
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = radius * (0.6 + 0.4 * Math.random());

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 1.5 + Math.random() * 3.5;
      phases[i] = Math.random();
      speeds[i] = 0.5 + Math.random() * 1.0;
    }

    return { positions, sizes, phases, speeds };
  }, [count, radius]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
    pointsRef.current.rotation.y += 0.0008;
    pointsRef.current.rotation.x += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
