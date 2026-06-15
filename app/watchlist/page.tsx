"use client"

import { useWatchlistStore } from "@/app/lib/watchlistStore"
import MovieCard from "@/app/collection/components-collection/MovieCard"
import React from "react";

export default function WatchlistPage() {
    const watchlist = useWatchlistStore((state) => state.watchlist)

    return (
        <section  className={"relative overflow-hidden border-b-[6px] h-screen w-screen border-black bg-[#111111]"}>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                {watchlist.length === 0 ? (
                    <p className="text-white">No movies saved yet</p> ) : (
                    watchlist.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>

        </section>
    )
}