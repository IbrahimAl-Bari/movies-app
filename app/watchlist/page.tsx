"use client"

import { useWatchlistStore } from "@/app/lib/watchlistStore"
import MovieCard from "@/app/collection/components-collection/MovieCard"
import React from "react";
import { CircleSlash2 } from "lucide-react"

export default function WatchlistPage() {
    const watchlist = useWatchlistStore((state) => state.watchlist)

    return (
        <section  className={"relative overflow-hidden border-b-[6px] h-screen w-screen border-black bg-[#111111]"}>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                {watchlist.length === 0 ? (
                    <div className={"text-white w-screen text-center mt-28"}>
                        <CircleSlash2 className={"w-20 h-20 text-red-200 mx-auto m-6"}/>
                        <h3> No Titles Were Found</h3>
                        <p className={"text-white/50"}>try reloading or adding new titles by clicking the bookmark icon</p>
                    </div> ) : (
                    // @ts-ignore
                    watchlist.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>

        </section>
    )
}