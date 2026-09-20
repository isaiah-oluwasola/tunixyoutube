import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Pins a section in place for an extra scroll distance so a scroll-scrubbed
 * cinematic animation has room to play out before the page continues.
 */
export function useSectionPin(
  ref: RefObject<HTMLElement | null>,
  opts: { extra?: string; disabled?: boolean; onUpdate?: (progress: number) => void } = {}
) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    if (opts.disabled || !ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current!,
        start: "top top",
        end: `+=${opts.extra ?? "120%"}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => opts.onUpdate?.(self.progress),
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, opts.disabled]);
}
