import { motion } from "framer-motion";
import { CHANNEL } from "../data/content";

export default function Subscribe() {
  return (
    <section id="subscribe" className="relative z-10 py-36">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,10,22,0.22),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3344]"
        >
          Join the Movement
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 text-4xl font-bold leading-tight sm:text-6xl"
        >
          Join the <span className="gradient-text text-glow">Tunix</span> Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-white/55"
        >
          Whether you're here to create 120FPS videos, improve your gaming footage, discover new
          editing tools, or become a better content creator — Tunix is here to help. Create
          smoother. Edit better. Play faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-11 flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href={CHANNEL.subscribeUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[#ff0a16] px-9 py-5 text-base font-bold text-white shadow-[0_20px_60px_-15px_rgba(255,10,22,0.9)] transition hover:-translate-y-1"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">🔔 Subscribe — {CHANNEL.handle}</span>
          </a>
          <a
            href={CHANNEL.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-5 text-base font-semibold text-white/90 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
          >
            Watch Latest Videos
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-5"
        >
          <a
            href={CHANNEL.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg transition hover:-translate-y-1 hover:bg-[#ff0a16]"
            title="YouTube"
          >
            ▶
          </a>
        </motion.div>
      </div>
    </section>
  );
}
