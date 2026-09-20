import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { FEATURED_VIDEO, CHANNEL } from "../data/content";

export default function Featured() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.8]);

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    rotateX.set((0.5 - (e.clientY - rect.top) / rect.height) * 8);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  }

  return (
    <section id="featured" ref={sectionRef} className="relative z-10 py-32">
      <motion.div
        style={{ scale: glowScale }}
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,10,22,0.16),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3344]">
            Featured Content
          </span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">The cinematic showcase</h2>
        </motion.div>

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={handleMove}
          onPointerLeave={() => {
            rotateX.set(0);
            rotateY.set(0);
          }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="perspective-1000 group relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
        >
          <div className="relative aspect-video overflow-hidden">
            <motion.img
              style={{ y: imgY }}
              src={FEATURED_VIDEO.thumb}
              alt={FEATURED_VIDEO.title}
              className="h-[120%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute right-4 top-4 rounded-md bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {FEATURED_VIDEO.duration}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#ff0a16]/40" />
                <span className="absolute inset-0 rounded-full bg-[#ff0a16] blur-xl opacity-70" />
                <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#ff0a16] shadow-[0_0_60px_rgba(255,10,22,0.9)]">
                  <svg viewBox="0 0 24 24" className="ml-1.5 h-10 w-10 fill-white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 p-8"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ff3344]">
                {CHANNEL.name} · Featured
              </span>
              <h3 className="mt-2 max-w-xl text-2xl font-bold sm:text-3xl">
                {FEATURED_VIDEO.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/60 sm:text-base">
                {FEATURED_VIDEO.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
