import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHANNEL, NAV_LINKS } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10 py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a href="#top" className="font-display text-2xl font-bold tracking-wide">
            {CHANNEL.name}
            <span className="text-[#ff0a16]">.</span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#ff0a16] to-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CHANNEL.url}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 sm:inline-flex"
            >
              ▶ YouTube
            </a>
            <a
              href={CHANNEL.subscribeUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-[#ff0a16] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(255,10,22,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(255,10,22,0.85)] sm:inline-flex"
            >
              Subscribe
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/98 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold"
              >
                {l.label}
              </a>
            ))}
            <a
              href={CHANNEL.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-lg bg-[#ff0a16] px-6 py-3 text-lg font-bold"
            >
              Visit Channel
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
