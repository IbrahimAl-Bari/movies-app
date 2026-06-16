import { Film ,  CircleUserRound } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import SearchBar from "@/app/components/SearchBar";

export async function Navigation() {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const username = user?.user_metadata?.username;

  return (
      <nav className="border-b-[6px] border-black bg-[#111111] px-6 py-2">

        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-5 text-white">

            <div className="flex items-center rounded-2xl gap-2 border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000000]">
              <Film className="h-6 w-6" />

              <span className="font-black max-lg:hidden uppercase tracking-tight" style={{ fontWeight: 900 }}>
              CINEMATIX
            </span>
            </div>

            <SearchBar />
          </div>

          <div className="flex items-center gap-8 max-lg:hidden">
            <Link href="/" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Home
            </Link>
            <Link href="/watch" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Watch
            </Link>
            <Link href="/collection" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Collection
            </Link>
            <Link href="/watchlist" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Watchlist
            </Link>
            <Link href="/profile" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              profile
            </Link>
          </div>

          {user ? (
              <div className="flex items-center gap-4">
            <span className="font-black text-white tracking-tight max-sm:hidden max-md:flex flex gap-3 mr-3 ">
              <CircleUserRound />
              {username || 'User'}
            </span>
                <form action="/auth/signout" method="post">
                  <button className="inline-block max-sm:px-3 max-sm:py-1 border-4 border-black bg-[#FF4D4D] px-6 py-2 font-black uppercase tracking-tight text-black shadow-[6px_6px_0px_0px_#FFD60A] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#FFD60A]">
                    Quit
                  </button>
                </form>
              </div>
          ) : (
              <Link
                  href="/collection"
                  className="inline-block border-4 border-black bg-[#FF4D4D] px-6 py-2 font-black uppercase tracking-tight text-black shadow-[6px_6px_0px_0px_#FFD60A] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#FFD60A]"
                  style={{ fontWeight: 900 }}
              >
                Sign Up
              </Link>
          )}
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <div className="hidden max-lg:flex items-center mt-3 w-full justify-center gap-8 max-md:gap-4 max-sm:text-sm">
            <Link href="/" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Home
            </Link>
            <Link href="/watch" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Watch
            </Link>
            <Link href="/collection" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Collection
            </Link>
            <Link href="/watchlist" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              Watchlist
            </Link>
            <Link href="/profile" className="font-black uppercase tracking-tight text-white/70 transition-colors hover:text-[#FFD60A]" style={{ fontWeight: 800 }}>
              profile
            </Link>
          </div>


        </div>

      </nav>
  );
}