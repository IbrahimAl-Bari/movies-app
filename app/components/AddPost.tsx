"use client";

import { useState } from "react";
import { createPost } from "@/app/lib/createPost";

export default function AddPost({ movieId , poster }: { movieId: string , poster: string}) {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);

    return (
        <div>
        <form action={createPost} className="space-y-2 w-[50%]">

            <input type="hidden" name="movie_id" value={movieId} />
            <input type="hidden" name="poster" value={poster} />

            <textarea
                name="content"
                placeholder="Write your review..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 bg-black border border-[#FFD60A]/50 text-white resize-none"
            />

            <span>On a Scale from 1 to 10 rate this title :</span>

            <input
                name="rating"
                type="number"
                min={0}
                max={10}
                value={rating}
                onChange={(e) => {
                    let value = Number(e.target.value);

                    if (value > 10) value = 10;
                    if (value < 1) value = 1;

                    setRating(value);
                }}
                className="w-10 h-10 p-2 ml-2 bg-black border border-[#FFD60A]/50 text-white text-center"
            />

            <br/>

            <button
                type="submit"
                className="bg-[#FFD60A] text-black font-black px-4 py-2 rounded">
                Post
            </button>
        </form>
        </div>
    );
}