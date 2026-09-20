import { motion, type Variants } from "framer-motion";
import { COVER_TOPICS, WHY_ITEMS } from "../data/content";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative z-10 py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* intro */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3344]">
              What is Tunix
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              A technology &amp; <span className="gradient-text">creator-focused</span> platform.
            </h2>
            <p className="mt-6 text-white/55">
              Tunix is a content-creation and technology channel focused on making video editing
              easier and more powerful. We explore tools, techniques, software, and workflows
              that help creators produce smoother, sharper, higher-quality videos.
            </p>
            <p className="mt-4 text-white/55">
              Whether you're a beginner learning video editing or an experienced creator looking
              for better ways to process your footage — Tunix is built to help you create better
              content.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { num: "120FPS", lbl: "Smooth Slow Motion" },
              { num: "AI", lbl: "RIFE / Flowframes Tools" },
              { num: "CapCut", lbl: "Editing Tutorials" },
              { num: "Gaming", lbl: "High-FPS Content" },
            ].map((s) => (
              <div
                key={s.num}
                className="glass rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:border-[#ff0a16]/50"
              >
                <div className="gradient-text text-2xl font-bold">{s.num}</div>
                <div className="mt-1 text-xs text-white/50">{s.lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* topics covered */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3344]">
              What We Cover
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Everything to level up your video</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COVER_TOPICS.map((topic, i) => (
              <motion.div
                key={topic.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -8, borderColor: "rgba(255,10,22,0.5)" }}
                className="glass rounded-2xl p-7 transition-colors"
              >
                <div className="text-3xl">{topic.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{topic.title}</h3>
                <p className="mt-2 text-sm text-white/50">{topic.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/45"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          id="mission"
          className="mx-auto mt-32 max-w-3xl scroll-mt-28 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3344]">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
            Help creators make <span className="gradient-text">better videos.</span>
          </h2>
          <p className="mt-5 text-white/50">
            Technology is constantly improving, and new editing tools are making it possible to
            create smoother and higher-quality content than ever before. Tunix exists to explore
            these technologies, test different techniques, and turn complicated processes into
            simple tutorials that anyone can follow.
          </p>
        </motion.div>

        {/* why follow */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3344]">
              Why Follow Tunix
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              We don't just talk tech — we show you how.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="font-medium text-white/85">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
