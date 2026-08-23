"use client";

import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Tone } from "./useThemeTone";

const COUNT = 14000;
/** Rough volume the field occupies, in world units. */
const RADIUS = 9;
const DEPTH = 7;

/**
 * Drift is per-point, in the vertex shader.
 *
 * Rotating the whole object instead would be far cheaper, but it reads as a
 * turntable — every point locked in formation. Independent drift is what makes
 * the field read as suspended matter rather than a rotating model, and it is
 * the entire difference between "3D on a website" and a place.
 */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSize;
  attribute float aSeed;
  attribute float aScale;
  varying float vFade;

  void main() {
    vec3 pos = position;

    float t = uTime * 0.12 + aSeed * 6.2831853;
    pos.x += sin(t) * 0.34 * uIntensity;
    pos.y += cos(t * 0.83) * 0.28 * uIntensity;
    pos.z += sin(t * 0.61) * 0.22 * uIntensity;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Depth fade: points far from the camera drop out rather than piling up
    // into a grey wall at the horizon.
    vFade = smoothstep(28.0, 6.0, -mvPosition.z);

    gl_PointSize = uSize * aScale * (14.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;

  void main() {
    // Round the point and soften its edge — square points read as pixels.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.12, d) * vFade * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function Field({ tone, intensity }: { tone: Tone; intensity: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const shouldReduce = useReducedMotion();

  /**
   * Built once. Regenerating positions on a theme change would resample the
   * whole field and make the lights-out transition look like a glitch.
   */
  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const scales = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i += 1) {
      // Cube-rooted radius gives even volumetric density. A plain random radius
      // clumps everything at the centre.
      const r = Math.cbrt(Math.random()) * RADIUS;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.62;
      positions[i * 3 + 2] = (Math.random() - 0.5) * DEPTH;

      seeds[i] = Math.random();
      // Biased small: a few large points read as focus, a uniform field as noise.
      scales[i] = 0.35 + Math.random() * Math.random() * 1.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1 },
      uSize: { value: 2.6 },
      uColor: { value: new THREE.Color("#000000") },
      uOpacity: { value: 0.5 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;

    if (!shouldReduce) {
      material.uniforms.uTime!.value += Math.min(delta, 0.1);
    }

    // Eased toward the target so route changes read as the field settling.
    const u = material.uniforms;
    const ease = 1 - Math.exp(-2 * Math.min(delta, 0.1));
    u.uIntensity!.value += (intensity - u.uIntensity!.value) * ease;

    const targetColor = tone === "dark" ? 1 : 0;
    (u.uColor!.value as THREE.Color).lerp(
      new THREE.Color(targetColor, targetColor, targetColor),
      ease,
    );

    // Dark grounds need lower alpha — white on black reads far hotter.
    const targetOpacity = (tone === "dark" ? 0.42 : 0.5) * (0.35 + intensity * 0.65);
    u.uOpacity!.value += (targetOpacity - u.uOpacity!.value) * ease;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
