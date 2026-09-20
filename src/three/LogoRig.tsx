import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import YouTubeLogo3D from "./YouTubeLogo3D";
import { useCinema } from "../context/CinemaContext";
import { mapRange, sampleLogoPose } from "./sceneMath";

function setGroupOpacity(group: THREE.Group, op: number) {
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh && mesh.material) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        const mat = m as THREE.Material & { opacity?: number; transparent?: boolean };
        if (typeof mat.opacity === "number") {
          mat.transparent = true;
          mat.opacity = op;
        }
      });
    }
  });
}

export default function LogoRig() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const { mouse, pageProgress, reducedMotion } = useCinema();
  const smoothedRotY = useRef(0);

  useFrame((state, delta) => {
    const t = pageProgress.value;
    const pose = sampleLogoPose(t);
    const group = groupRef.current;
    if (!group) return;

    const time = state.clock.getElapsedTime();
    const idleBob = reducedMotion ? 0 : Math.sin(time * 0.6) * 0.08;
    const idleTilt = reducedMotion ? 0 : Math.sin(time * 0.4) * 0.04;
    const mouseInfluence = reducedMotion ? 0 : 1;

    group.position.set(pose.pos[0], pose.pos[1] + idleBob, pose.pos[2]);

    // smooth-follow rotation so mouse parallax feels physical, not snappy
    const targetRotY = pose.rot[1] + mouse.x * 0.35 * mouseInfluence;
    smoothedRotY.current = THREE.MathUtils.damp(smoothedRotY.current, targetRotY, 4, delta);

    group.rotation.set(
      pose.rot[0] + idleTilt - mouse.y * 0.18 * mouseInfluence,
      smoothedRotY.current,
      pose.rot[2]
    );
    group.scale.setScalar(pose.scale);
    setGroupOpacity(group, pose.op);

    // portal ring burst timed to the "opening" moment
    const ringT = mapRange(t, 0.16, 0.4, 0, 1);
    const ringPulse = Math.sin(Math.PI * Math.min(1, ringT)) * (ringT > 0 && ringT < 1 ? 1 : 0);
    if (ringRef.current) {
      const s = 0.6 + ringT * 6.2;
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = ringPulse * 0.55;
      ringRef.current.rotation.z += delta * 0.4;
    }
    if (ring2Ref.current) {
      const s = 0.4 + ringT * 4.4;
      ring2Ref.current.scale.setScalar(s);
      const mat = ring2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = ringPulse * 0.35;
      ring2Ref.current.rotation.z -= delta * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 96]} />
        <meshBasicMaterial color="#ff2b3a" transparent opacity={0} toneMapped={false} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1, 0.012, 16, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} toneMapped={false} />
      </mesh>
      <YouTubeLogo3D ref={groupRef} />
    </group>
  );
}
