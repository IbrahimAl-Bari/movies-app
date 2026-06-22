"use client";

import { useState, useTransition } from "react";
import { createReview } from "@/app/lib/createReview";

export default function AddReview({ movieId , poster }: { movieId: string , poster: string}) {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [isPending, startTransition] = useTransition();

    const MAX_CHARS = 300;

    return (
        <div>
        <form action={(formData) => {
            startTransition(async () => {
                await createReview(formData);
            });
        }} className="space-y-2 w-[50%]">

            <input type="hidden" name="movie_id" value={movieId} />
            <input type="hidden" name="poster" value={poster} />

            <textarea
                name="content"
                placeholder="Write your review..."
                value={content}
                onChange={(e) => {
                    const value = e.target.value;

                    if (value.length <= MAX_CHARS) {
                        setContent(value);
                    } else {
                        setContent(value.slice(0, MAX_CHARS));
                    }
                }}
                className="w-full p-2 bg-black border border-[#FFD60A]/50 text-white resize-none"
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="tex-white text-lg max-sm:text-md">
                       Rate this title from 1 to 10 :
                     </span>

                    <input
                        name="rating"
                        type="number"
                        min={1}
                        max={10}
                        value={rating}
                        onChange={(e) => {
                            let value = Number(e.target.value);
                            if (value > 10) value = 10;
                            if (value < 1) value = 1;
                            setRating(value);
                        }}
                        className="text-lg w-10 h-10 p-1 bg-black border border-[#FFD60A]/50 text-white text-center"
                    />
                </div>

                <div className={`max-sm:hidden ${content.length >= MAX_CHARS ? "text-red-500" : "text-gray-400"}`}>
                    {content.length} / {MAX_CHARS}
                </div>
            </div>

            <br/>

            <button
                type="submit"
                disabled={isPending}
                className="bg-[#FFD60A] cursor-pointer text-black font-black px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                {isPending ? "Posting..." : "Post"}
            </button>
        </form>
        </div>
    );
}