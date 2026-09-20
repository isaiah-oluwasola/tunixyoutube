import { CHANNEL } from "../data/content";

const FOOTER_COLS = [
  { title: "120FPS", links: ["High-Frame-Rate Video", "Frame Interpolation", "Smooth Slow Motion"] },
  { title: "Editing", links: ["Editing Techniques", "Effects", "Software Tutorials"] },
  { title: "AI Video", links: ["AI Interpolation", "Upscaling", "Video Processing"] },
  { title: "Gaming", links: ["Gaming Clips", "High-FPS Gameplay", "Montages"] },
  { title: "Creation", links: ["YouTube Shorts", "Creator Tools", "Strategies"] },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/80 pt-20 pb-8 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 pb-14 sm:grid-cols-3 md:grid-cols-6">
          <div className="col-span-2">
            <div className="font-display text-2xl font-bold">
              {CHANNEL.name}
              <span className="text-[#ff0a16]">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/45">
              120FPS • Video Editing • AI Video • Gaming • Content Creation. Create with Tunix.
            </p>
            <a
              href={CHANNEL.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-[#ff0a16]"
              title="YouTube"
            >
              ▶
            </a>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#videos"
                      className="text-sm text-white/45 transition hover:pl-1 hover:text-[#ff3344]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/40">© {new Date().getFullYear()} {CHANNEL.name}. All rights reserved.</p>
          <p className="text-xs uppercase tracking-widest text-white/30">
            120FPS • Video Editing • AI Video • Gaming • Content Creation
          </p>
        </div>
      </div>
    </footer>
  );
}
