import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import LogoRig from "./LogoRig";
import { useCinema } from "../context/CinemaContext";

export default function Scene() {
  const { isMobile, reducedMotion } = useCinema();

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 60 }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#050002", 8, 26]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 6]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-6, -2, 3]} intensity={12} color="#ff0a16" distance={20} />
        <pointLight position={[5, -3, -4]} intensity={8} color="#ff5566" distance={18} />
        <spotLight
          position={[0, 8, 4]}
          angle={0.5}
          penumbra={1}
          intensity={4}
          color="#ffffff"
          distance={30}
        />

        <Suspense fallback={null}>
          <LogoRig />
          <Sparkles
            count={isMobile ? 60 : 160}
            scale={[16, 10, 12]}
            size={2.4}
            speed={reducedMotion ? 0 : 0.25}
            opacity={0.55}
            color="#ff3344"
          />
          <Sparkles
            count={isMobile ? 30 : 70}
            scale={[20, 12, 14]}
            size={1.4}
            speed={reducedMotion ? 0 : 0.15}
            opacity={0.35}
            color="#ffffff"
          />
        </Suspense>

        {!isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.35}
              mipmapBlur
              radius={0.7}
            />
            <Vignette eskil={false} offset={0.25} darkness={0.9} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
