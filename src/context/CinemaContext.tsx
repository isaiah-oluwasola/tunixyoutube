import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

export interface CinemaRefs {
  /** normalized pointer position, -1..1 */
  mouse: { x: number; y: number };
  /** 0..1 progress through the pinned "logo opening" cinematic section */
  openingProgress: { value: number };
  /** 0..1 progress across the entire scrollable page */
  pageProgress: { value: number };
  reducedMotion: boolean;
  isMobile: boolean;
}

const CinemaCtx = createContext<CinemaRefs | null>(null);

export function CinemaProvider({ children }: { children: ReactNode }) {
  const mouse = useRef({ x: 0, y: 0 }).current;
  const openingProgress = useRef({ value: 0 }).current;
  const pageProgress = useRef({ value: 0 }).current;

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 820,
    []
  );

  useEffect(() => {
    let raf = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        pageProgress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ mouse, openingProgress, pageProgress, reducedMotion, isMobile }),
    [mouse, openingProgress, pageProgress, reducedMotion, isMobile]
  );

  return <CinemaCtx.Provider value={value}>{children}</CinemaCtx.Provider>;
}

export function useCinema() {
  const ctx = useContext(CinemaCtx);
  if (!ctx) throw new Error("useCinema must be used inside CinemaProvider");
  return ctx;
}
