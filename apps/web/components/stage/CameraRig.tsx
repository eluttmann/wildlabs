"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import * as THREE from "three";
import { useStage } from "./StageProvider";

/** Critically-damped follow. Higher = tighter tracking, less float. */
const FOLLOW = 1.6;
/** How far the pointer can nudge the camera, in world units. */
const PARALLAX = 0.45;

/**
 * Flies the camera toward whatever pose the current route asked for.
 *
 * Damped exponential follow rather than a tweened animation: a tween has to be
 * cancelled and restarted when the target changes mid-flight, which produces a
 * visible stutter on fast navigation. Damping just re-aims — interrupting it
 * looks like a course correction, which is what it is.
 */
export function CameraRig() {
  const { pose } = useStage();
  const camera = useThree((state) => state.camera);
  const shouldReduce = useReducedMotion();

  const target = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3());
  const pointer = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    // Clamp: a backgrounded tab resumes with a huge delta and the camera jumps.
    const dt = Math.min(delta, 0.1);
    const alpha = shouldReduce ? 1 : 1 - Math.exp(-FOLLOW * dt);

    target.current.set(...pose.position);

    if (!shouldReduce) {
      // Pointer parallax. Small enough to feel like depth, not like a joystick.
      pointer.current.lerp(state.pointer, 1 - Math.exp(-2.5 * dt));
      target.current.x += pointer.current.x * PARALLAX;
      target.current.y += pointer.current.y * PARALLAX * 0.6;
    }

    camera.position.lerp(target.current, alpha);

    lookAt.current.lerp(new THREE.Vector3(...pose.target), alpha);
    camera.lookAt(lookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const nextFov = THREE.MathUtils.lerp(camera.fov, pose.fov, alpha);
      if (Math.abs(nextFov - camera.fov) > 0.01) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}
