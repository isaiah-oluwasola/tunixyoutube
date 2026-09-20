import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function VideoCard({
  title,
  category,
  thumb,
  duration,
  index,
}: {
  title: string;
  category: string;
  thumb: string;
  duration: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const lift = useSpring(0, { stiffness: 200, damping: 22 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${glowX}px ${glowY}px, rgba(255,10,22,0.25), transparent 70%)`;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 18);
    rotateX.set((0.5 - py) * 14);
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
    lift.set(-10);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000"
    >
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, y: lift, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumb}
            alt={title}
            className="h-full w-full scale-105 object-cover transition-transform duration-700 group-hover:scale-[1.15]"
            style={{ transform: "translateZ(20px)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          <div className="absolute right-3 bottom-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white/85 backdrop-blur">
            {duration}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-16 w-16 scale-75 items-center justify-center rounded-full opacity-0 transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#ff0a16]/50" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#ff0a16] shadow-[0_0_40px_rgba(255,10,22,0.85)]">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-5" style={{ transform: "translateZ(30px)" }}>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#ff3344]">
            {category}
          </span>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-white/95">{title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}
