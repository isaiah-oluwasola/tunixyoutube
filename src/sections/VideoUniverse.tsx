import { motion } from "framer-motion";
import { VIDEOS } from "../data/content";
import VideoCard from "../components/VideoCard";

export default function VideoUniverse() {
  return (
    <section id="videos" className="relative z-10 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff3344]">
            Video Universe
          </span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Floating in the content galaxy</h2>
          <p className="mt-4 text-white/50">
            Each upload lives here — a floating 3D card in the Tunix universe. Hover to tilt,
            glow, and preview.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.title} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
