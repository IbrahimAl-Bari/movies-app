"use client";

import React from "react";
import { useWatchlistStore } from "@/app/lib/watchlistStore";
import { Bookmark } from "lucide-react";

const BookmarkComp = ({ movie }: any) => {
    const isSaved = useWatchlistStore((state) =>
        state.isSaved(movie.id)
    );

    const toggleMovie = useWatchlistStore((state) => state.toggleMovie);

    const handleBookmark = (e: any) => {
        e.stopPropagation();
        toggleMovie(movie);
    };

    return (
        <button
            onClick={handleBookmark}
            className={`absolute top-2 left-2 border-2 flex items-center justify-center gap-1 
            border-black px-2 py-1 text-xs font-black shadow-[3px_3px_0px_0px_#000]
            cursor-pointer transition-all
            ${isSaved ? "bg-green-400" : "bg-[#FFD60A]"}`}>

            <Bookmark
                className="w-5 h-5"
                fill={isSaved ? "black" : "none"}
                stroke="black"
                strokeWidth={2}
            />
        </button>
    );
};

export default BookmarkComp;