"use client"

import React from "react"
import { Calendar, Clock4, Star, Bookmark , VoteIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useWatchlistStore } from "@/app/lib/watchlistStore"

// @ts-ignore
const MovieCard = ({ movie }) => {
    const router = useRouter()

    const toggleMovie = useWatchlistStore((state) => state.toggleMovie)
    const isSaved = useWatchlistStore((state) =>
        state.isSaved(movie.id)
    )


    // @ts-ignore
    const handleBookmark = (e) => {
        e.stopPropagation()
        toggleMovie(movie)
    }

    const handleClick = () => {
        router.push(`/titles/${movie.id}`)
    }

    const title = movie.primaryTitle || movie.title || "Untitled Masterpiece"
    const imgUrl = movie.poster || movie.posterUrl || movie.poster_path
        && `https://image.tmdb.org/t/p/w500${movie.poster_path}` || null

    const vote = movie.vote_average ? movie.vote_average : null
    const rating = movie.averageRating ? movie.averageRating : null

    const runtime = movie.runtimeMinutes ?? 0
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    const rate = movie.vote_count

    const formattedRuntime =
        runtime > 0
            ? hours > 0
                ? `${hours}H ${minutes}M`
                : `${minutes}M`
            : null

    const theyear = movie.year || movie.release_date.split("-")[0];

    return (
        <div
            onClick={handleClick}
            className="flex flex-col border-[3px] md:border-4 border-black bg-[#1a1a1a]
            shadow-[6px_6px_0px_0px_#FFD60A]
            hover:-translate-x-1 hover:-translate-y-1
            hover:shadow-[10px_10px_0px_0px_#FFD60A]
            active:translate-x-0 active:translate-y-0
            active:shadow-[4px_4px_0px_0px_#FFD60A]
            transition-all duration-150 group cursor-pointer"
        >
            <div className="h-[260px] border-b-[3px] md:border-b-4 border-black relative overflow-hidden bg-neutral-800">
                {imgUrl ? (
                    <img
                        src={imgUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 font-black text-center text-xs uppercase tracking-tight text-white">
                        No Image
                    </div>
                )}

                {/* Bookmark */}
                <div
                    onClick={handleBookmark}
                    className={`absolute top-2 left-2 border-2 flex items-center gap-1 border-black px-1.5 py-0.5 text-xs font-black shadow-[3px_3px_0px_0px_#000000]
                    cursor-pointer transition-all
                    ${isSaved ? "bg-green-400" : "bg-[#FFD60A]"}`}
                >
                    <Bookmark
                        className={`w-5 h-5 ${
                            isSaved ? "fill-black" : ""
                        }`}
                    />
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2 border-2 flex items-center gap-1 border-black bg-[#FFD60A] px-1.5 py-0.5 text-xs font-black text-black shadow-[3px_3px_0px_0px_#000000]">
                    <Star className="w-3 h-3 fill-black" />
                    {rating?.toFixed(1) ?? vote?.toFixed(1) ?? "N/A"}
                </div>
            </div>

            <div className="p-3 flex flex-col grow justify-between gap-3">
                <h4
                    className="text-white text-center font-black uppercase tracking-tight text-sm md:text-base leading-tight line-clamp-2"
                    title={title}
                >
                    {title}
                </h4>

                <div className="text-xs font-bold flex justify-between text-gray-300">
                    {rate && (
                        <span className="flex items-center gap-1.5">
                            <VoteIcon className="w-3.5 h-3.5 text-[#FFD60A]" />
                            {rate}
                        </span>
                    )}
                    {runtime > 0 && (
                        <span className="flex items-center gap-1.5">
                            <Clock4 className="w-3.5 h-3.5 text-[#FFD60A]" />
                            {formattedRuntime}
                        </span>
                    )}

                    {theyear && (
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#FFD60A]" />
                            {theyear}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieCard