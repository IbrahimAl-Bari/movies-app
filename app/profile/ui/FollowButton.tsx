"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/app/utils/supabase/client";

export default function FollowButton({
                                         profileId,
                                         currentUserId,
                                         isFollowing: initial
                                     }: {
    profileId: string;
    currentUserId: string;
    isFollowing: boolean;
}) {
    const supabase = createClient();
    const [isFollowing, setIsFollowing] = useState(initial);
    const [loading, startTransition] = useTransition();

    const toggleFollow = async () => {
        startTransition(async () => {
            if (isFollowing) {
                await supabase
                    .from("follows")
                    .delete()
                    .match({
                        follower_id: currentUserId,
                        following_id: profileId
                    });

                setIsFollowing(false);
            } else {
                await supabase.from("follows").insert({
                    follower_id: currentUserId,
                    following_id: profileId
                });

                setIsFollowing(true);
            }
        });
    };

    return (
        <button
            onClick={toggleFollow}
            disabled={loading}
            className={`px-4 py-2 w-20 h-10 mr-10 flex items-center justify-center border-black shadow-[4px_4px_0px_0px_#FF4D4D] border-4 font-black rounded-lg transition ${
                isFollowing
                    ? "bg-black text-white"
                    : "bg-[#FFD60A] text-black"
            }`}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
}