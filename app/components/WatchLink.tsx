"use client"

import React, { useState } from "react"

type Media = {
    id: string | number;
    number_of_seasons: number;
    number_of_episodes: number;
}

export default function WatchLink({ media, type, title }: { media: Media , type: string, title: string }) {
    const [season, setSeason] = useState(1)
    const [episode, setEpisode] = useState(1)

    if (type === "movie") {
        return (
            <h4 className="text-center mt-5 uppercase text-[1rem] text-[#FFD60A] hover:underline-offset-1 underline font-black italic">
                <a href={`https://vidfast.pro/movie/${media.id}?autoPlay=true`} target="_blank" rel="noopener noreferrer">
                    Watch {title} Here
                </a>
            </h4>
        )
    }

    return (
        <div className="flex flex-col items-center mt-6 gap-3">
            <div className="flex gap-4">
                <label className="flex flex-col items-center text-xs font-black text-white uppercase tracking-wider">
                    Season
                    <input
                        type="number"
                        min="1"
                        max={media.number_of_seasons}
                        value={season}
                        onChange={(e) => {
                            const val = Math.max(1, Number(e.target.value));
                            setSeason(Math.min(media.number_of_seasons || 1, val));
                        }}
                        className="mt-1 w-16 bg-[#1a1a1a] border-2 border-black shadow-[3px_3px_0px_0px_#FFD60A] text-[#FFD60A] font-black p-1 text-center focus:outline-none"
                    />
                </label>

                <label className="flex flex-col items-center text-xs font-black text-white uppercase tracking-wider">
                    Episode
                    <input
                        type="number"
                        min="1"
                        max={media.number_of_episodes}
                        value={episode}
                        onChange={(e) => {
                            const val = Math.max(1, Number(e.target.value));
                            setEpisode(Math.min(media.number_of_episodes || 1, val));
                        }}
                        className="mt-1 w-16 bg-[#1a1a1a] border-2 border-black shadow-[3px_3px_0px_0px_#FFD60A] text-[#FFD60A] font-black p-1 text-center focus:outline-none"
                    />
                </label>
            </div>

            <h4 className="text-center mt-2 uppercase text-[1rem] text-[#FFD60A] hover:underline-offset-1 underline font-black italic">
                <a
                    href={`https://vidfast.pro/tv/${media.id}/${season}/${episode}?autoPlay=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Watch S{season} E{episode} Here
                </a>
            </h4>
        </div>
    )
}