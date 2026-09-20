import { motion } from "framer-motion";
import { CHANNEL, STATS } from "../data/content";
import StatCounter from "../components/StatCounter";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,10,22,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/60 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#ff0a16] shadow-[0_0_10px_#ff0a16]" />
            {CHANNEL.handle} · Live on YouTube
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Smooth. Fast.
            <br />
            <span className="gradient-text text-glow">Creative.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-white/55">{CHANNEL.description}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={CHANNEL.subscribeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff0a16] px-7 py-3.5 text-sm font-bold text-white shadow-[0_15px_40px_-10px_rgba(255,10,22,0.75)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(255,10,22,0.9)]"
            >
              🔔 Subscribe on YouTube
            </a>
            <a
              href="#videos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
            >
              Explore Videos
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
            {STATS.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </motion.div>

        {/* right column intentionally left open so the 3D logo reads clearly against the space */}
        <div className="hidden md:block" aria-hidden />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll to begin</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-white/25 p-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff0a16]" />
        </motion.span>
      </motion.div>
    </section>
  );
}
