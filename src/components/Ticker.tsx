import { TICKER_ITEMS } from "../data/content";

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 bg-black/60 py-4 backdrop-blur">
      <div className="flex w-max animate-marquee gap-0">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-7 whitespace-nowrap px-7 font-display text-base font-semibold text-white/50"
          >
            {item}
            <span className="text-[#ff0a16]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
