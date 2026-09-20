import { useRef, useState } from "react";
import { useSectionPin } from "../hooks/useSectionPin";
import { useCinema } from "../context/CinemaContext";

const PHRASES = [
  { at: 0, text: "INITIATING SEQUENCE" },
  { at: 0.32, text: "BREAKING THROUGH" },
  { at: 0.62, text: "THE PORTAL OPENS" },
  { at: 0.88, text: "WELCOME TO THE UNIVERSE" },
];

export default function LogoOpening() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const { reducedMotion } = useCinema();

  useSectionPin(ref, {
    extra: "130%",
    disabled: reducedMotion,
    onUpdate: setProgress,
  });

  const active = [...PHRASES].reverse().find((p) => progress >= p.at) ?? PHRASES[0];
  const flash = Math.sin(Math.PI * Math.min(1, Math.max(0, (progress - 0.18) / 0.24)));

  return (
    <section
      ref={ref}
      id="opening"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
        style={{
          opacity: progress > 0.18 && progress < 0.42 ? Math.max(0, flash) * 0.5 : 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), rgba(255,10,22,0.4) 35%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-white/35">
          Cinematic Sequence
        </p>
        <h2
          key={active.text}
          className="mt-5 text-3xl font-bold uppercase tracking-widest text-white/90 sm:text-5xl"
          style={{
            opacity: 0.9,
            textShadow: "0 0 40px rgba(255,10,22,0.5)",
          }}
        >
          {active.text}
        </h2>
        <div className="mx-auto mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#ff0a16] to-white"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
