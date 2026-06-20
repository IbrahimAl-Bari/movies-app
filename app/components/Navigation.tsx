import { Film } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/server";
import SearchBar from "@/app/components/SearchBar";
import NavLinks from "@/app/components/NavLinks"; // Import your new component

export async function Navigation() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let username = null;
  let avatar = null;

  if (user) {
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

    username = profile?.username;
    avatar = profile?.avatar_url;
  }

  return (
      <>
        {/* --- TOP NAVBAR --- */}
        <nav className="border-b-[6px] border-black bg-[#111111] max-xs:px-2 px-6 py-2">
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

            {/* This renders BOTH Desktop & Mobile link layouts natively */}
            <NavLinks avatar={avatar} />

            {user ? (
                <div className="flex items-center gap-4">
                  <div className="font-black items-center text-white tracking-tight max-sm:hidden max-md:flex flex gap-3 mr-3 ">
                    <img
                        src={avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${username}`}
                        className="w-8 h-8 rounded-full border border-black object-cover"
                    />
                    {username || 'User'}
                  </div>
                  <form action="/auth/signout" method="post">
                    <button className="inline-block max-xs:text-sm max-sm:px-3 max-sm:py-1 border-4 border-black bg-[#FF4D4D] px-6 py-2 font-black uppercase tracking-tight text-black shadow-[6px_6px_0px_0px_#FFD60A] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#FFD60A]">
                      Quit
                    </button>
                  </form>
                </div>
            ) : (
                <Link
                    href="/home"
                    className="inline-block border-4 border-black bg-[#FF4D4D] font-black uppercase tracking-tight text-black transition-all hover:translate-x-0.5 hover:translate-y-0.5
  px-6 py-2 shadow-[6px_6px_0px_0px_#FFD60A] hover:shadow-[4px_4px_0px_0px_#FFD60A]
  max-sm:px-3 max-sm:py-1 max-sm:text-xs max-sm:shadow-[3px_3px_0px_0px_#FFD60A] max-sm:hover:shadow-[2px_2px_0px_0px_#FFD60A]"
                    style={{ fontWeight: 900 }}
                >
                  Sign Up
                </Link>
            )}
          </div>
        </nav>
      </>
  );
}