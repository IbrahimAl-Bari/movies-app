// @/app/components/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, TvMinimalPlay, LibraryBig, Bookmark, CircleUserRound } from "lucide-react";

interface NavLinksProps {
    avatar: string | null;
}

export default function NavLinks({ avatar }: NavLinksProps) {
    const pathname = usePathname();

    const getLinkClass = (href: string) => {
        const isActive = pathname === href;
        return `font-black uppercase tracking-tight transition-colors ${
            isActive ? "text-[#FFFFFF]" : "text-white/70 hover:text-[#FFD60A]"
        }`;
    };

    return (
        <>
            {/* DESKTOP LINKS */}
            <div className="flex items-center gap-8 max-lg:hidden">
                <Link href="/" className={getLinkClass("/")} style={{ fontWeight: 800 }}>Home</Link>
                <Link href="/watch" className={getLinkClass("/watch")} style={{ fontWeight: 800 }}>Watch</Link>
                <Link href="/collection" className={getLinkClass("/collection")} style={{ fontWeight: 800 }}>Collection</Link>
                <Link href="/watchlist" className={getLinkClass("/watchlist")} style={{ fontWeight: 800 }}>Watchlist</Link>
                <Link href="/profile" className={getLinkClass("/profile")} style={{ fontWeight: 800 }}>Profile</Link>
            </div>

            {/* MOBILE BOTTOM LINKS */}
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t-[6px] border-black bg-[#111111] px-4 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.3)]">
                <div className="mx-auto flex max-w-7xl items-center justify-around gap-2 text-sm max-xs:text-xs">

                    <Link href="/" className={getLinkClass("/")}>
                        <House
                            className="h-6 w-6"
                            strokeWidth={pathname === "/" ? 2.5 : 2}
                        />
                    </Link>

                    <Link href="/watch" className={getLinkClass("/watch")}>
                        <TvMinimalPlay
                            className="h-6 w-6"
                            strokeWidth={pathname === "/watch" ? 2.5 : 2}
                        />
                    </Link>

                    <Link href="/collection" className={getLinkClass("/collection")}>
                        <LibraryBig
                            className="h-6 w-6"
                            strokeWidth={pathname === "/collection" ? 2.5 : 2}
                        />
                    </Link>

                    <Link href="/watchlist" className={getLinkClass("/watchlist")}>
                        <Bookmark
                            className="h-6 w-6"
                            strokeWidth={pathname === "/watchlist" ? 3 : 2}
                        />
                    </Link>

                    <Link href="/profile" className={getLinkClass("/profile")}>
                        {avatar ? (
                            /* If avatar exists, render the image wrapper with a thick active border */
                            <img
                                src={avatar}
                                alt="Profile"
                                className={`w-6 h-6 rounded-full object-cover transition-all ${
                                    pathname === "/profile"
                                        ? "border-2 border-[#FFFFFF]"
                                        : "border border-white/50"
                                }`}
                            />
                        ) : (
                            /* Fallback to Lucide Icon if no user avatar string is present */
                            <CircleUserRound
                                className="h-6 w-6"
                                strokeWidth={pathname === "/profile" ? 2.5 : 2}
                            />
                        )}
                    </Link>

                </div>
            </div>
        </>
    );
}