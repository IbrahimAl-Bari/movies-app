"use client";

import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/app/utils/supabase/client";

export default function LikeButton({
                                       postId,
                                       userId,
                                       initialLiked,
                                       initialCount,
                                   }: {
    postId: string;
    userId: string;
    initialLiked: boolean;
    initialCount: number;
}) {
    const supabase = createClient();

    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const [animating, setAnimating] = useState(false);

    const toggleLike = async () => {
        setAnimating(true);

        setTimeout(() => {
            setAnimating(false);
        }, 300);

        if (liked) {
            setLiked(false);
            setCount((c) => c - 1);

            const { error } = await supabase
                .from("post_likes")
                .delete()
                .match({
                    post_id: postId,
                    user_id: userId,
                });

            if (error) {
                setLiked(true);
                setCount((c) => c + 1);
            }
        } else {
            setLiked(true);
            setCount((c) => c + 1);

            const { error } = await supabase
                .from("post_likes")
                .insert({
                    post_id: postId,
                    user_id: userId,
                });

            if (error) {
                setLiked(false);
                setCount((c) => c - 1);
            }
        }
    };

    return (
        <button
            id={`like-${postId}`}
            onClick={toggleLike}
            className="flex items-center gap-3 group"
        >
            <ThumbsUp
                size={22}
                fill={liked ? "currentColor" : "transparent"}
                className={`
                    transition-all duration-300
                    ${liked ? "text-[#FFD60A]" : "text-white"}
                    ${animating ? "animate-thumbs-bounce" : ""}
                `}
            />

            <span
                className={`
                    font-bold transition-all duration-300
                    ${liked ? "text-[#FFD60A]" : "text-white"}
                    ${animating ? "scale-125" : ""}
                `}
            >
                {count}
            </span>
        </button>
    );
}