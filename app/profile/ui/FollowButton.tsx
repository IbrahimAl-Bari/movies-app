"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/app/utils/supabase/client";
import {themes} from "@/app/lib/themes";

export default function FollowButton({
                                         profileId,
                                         currentUserId,
                                         isFollowing: initial,
                                         ThemeAccent,
                                        boxShadow,
                                     }: {
    profileId: string;
    currentUserId: string;
    isFollowing: boolean;
    ThemeAccent: string;
    boxShadow: string;
}) {
    const supabase = createClient();
    const [isFollowing, setIsFollowing] = useState(initial);
    const [loading, startTransition] = useTransition();

    const toggleFollow = async () => {
        startTransition(async () => {
            if (isFollowing) {
                const { error } = await supabase
                    .from("follows")
                    .delete()
                    .match({
                        follower_id: currentUserId,
                        following_id: profileId
                    });

                if (!error) {
                    setIsFollowing(false);
                }
            } else {
                const { error } = await supabase.from("follows").insert({
                    follower_id: currentUserId,
                    following_id: profileId
                });

                if (!error) {
                    setIsFollowing(true);
                }
            }
        });
    };

    return (
        <button
            onClick={toggleFollow}
            disabled={loading}
            className={`px-4 py-2 cursor-pointer w-20 h-10 max-xs:w-15 max-xs:text-xs mr-10 flex items-center justify-center shadow-[2px_2px_0px_0px_#ffffff] border-black border-4 font-black rounded-lg transition ${
                isFollowing
                    ? `text-white text-sm`
                    : ` text-black`
            }`}
            style={{
                backgroundColor: isFollowing ? ThemeAccent : "#FFD60A",
                boxShadow: `${boxShadow}`,
            }}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
}