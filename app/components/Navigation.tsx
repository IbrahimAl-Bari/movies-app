import { Film , CircleUserRound } from "lucide-react";

export function Navigation() {
  return (
    <nav className="border-b-[6px] border-black bg-[#111111] px-6 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000000]">
            <Film className="h-6 w-6" />
            <span className="font-black uppercase tracking-tight" style={{ fontWeight: 900 }}>CINEMATIX</span>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
            Home
          </a>
          <a href="#" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
            Movies
          </a>
          <a href="#" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
            Series
          </a>
          <a href="#" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
            Trending
          </a>
          <a href="#" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
            Genres
          </a>
        </div>

        <button className="border-4 border-black bg-[#FF4D4D] px-6 py-2 font-black uppercase tracking-tight text-black shadow-[6px_6px_0px_0px_#FFD60A] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#FFD60A]" style={{ fontWeight: 900 }}>
          Sign Up
        </button>
      </div>
    </nav>
  );
}
