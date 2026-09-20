import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

/**
 * A stylised 3D YouTube "play button" logo built from primitives so it can be
 * treated as a real physical object in the scene (depth, reflections, shadow).
 */
const YouTubeLogo3D = forwardRef<THREE.Group>((_props, ref) => {
  const triangleShape = useMemo(() => {
    const shape = new THREE.Shape();
    const s = 0.62;
    shape.moveTo(-s * 0.55, s);
    shape.lineTo(-s * 0.55, -s);
    shape.lineTo(s * 0.85, 0);
    shape.closePath();
    return shape;
  }, []);

  const triangleGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(triangleShape, {
        depth: 0.36,
        bevelEnabled: true,
        bevelThickness: 0.045,
        bevelSize: 0.04,
        bevelSegments: 4,
        curveSegments: 12,
      }),
    [triangleShape]
  );

  return (
    <group ref={ref}>
      {/* red rounded body */}
      <RoundedBox args={[3.4, 2.35, 0.75]} radius={0.42} smoothness={8} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#ff0a16"
          roughness={0.28}
          metalness={0.15}
          clearcoat={0.9}
          clearcoatRoughness={0.2}
          emissive="#5c0006"
          emissiveIntensity={0.35}
        />
      </RoundedBox>

      {/* subtle glowing outline shell (fake bloom base) */}
      <RoundedBox args={[3.52, 2.47, 0.6]} radius={0.44} smoothness={8} position={[0, 0, -0.02]}>
        <meshBasicMaterial color="#ff2b3a" transparent opacity={0.18} />
      </RoundedBox>

      {/* white play triangle */}
      <mesh
        geometry={triangleGeometry}
        position={[-0.28, 0, 0.2]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#f5f7fb"
          roughness={0.15}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
});

YouTubeLogo3D.displayName = "YouTubeLogo3D";
export default YouTubeLogo3D;
