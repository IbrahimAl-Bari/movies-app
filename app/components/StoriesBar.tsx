"use client"

import React from "react"
import Link from "next/link"

export default function StoriesBar({ following }: { following: any[] }) {
    if (following.length === 0) return null;

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 border-b-4 border-black">
            {following.map((person) => (
                <div key={person.id} className="flex flex-col items-center gap-1 shrink-0">
                    <Link href={`/profile/${person.username}`}>
                        <div className="w-32 h-32 max-sm:w-20 max-sm:h-20 max-xs:w-16 max-xs:h-16 rounded-full border-4 border-black p-0.5 bg-[#FFD60A] shadow-[4px_4px_0px_0px_#000]">
                            <img
                                src={person.avatar_url || `https://ui-avatars.com/api/?name=${person?.username}&background=FFD60A&color=000&bold=true`}
                                alt={person.username}
                                className="w-full h-full rounded-full object-cover bg-black"
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}