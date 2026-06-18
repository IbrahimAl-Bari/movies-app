"use client";

import { useEffect, useState } from "react";
import AvatarModal from "./AvatarModal";

// Added TypeScript interface for cleaner props, adjust as needed
interface Props {
    profile: any;
}

export default function AvatarButton({ profile }: Props) {
    const [open, setOpen] = useState(false);

    const currentUrl = profile?.avatar_url;
    const fallback = `https://ui-avatars.com/api/?name=${profile?.username}&background=FFD60A&color=000&bold=true`;

    // State to handle instant UI updates without refreshing
    const [src, setSrc] = useState(currentUrl || fallback);

    useEffect(() => {
        if (!currentUrl) {
            setSrc(fallback);
            return;
        }
        // Cache-bust ONLY when url changes
        setSrc(`${currentUrl}?v=${Date.now()}`);
    }, [currentUrl, fallback]);

    return (
        <>
            <div className="relative w-28 h-28">
                <img
                    src={src}
                    className="w-28 h-28 rounded-full border-4 border-black object-cover bg-white"
                    alt="avatar"
                />

                <button
                    onClick={() => setOpen(true)}
                    className="absolute text-black font-black bottom-0 right-0 w-8 h-8 bg-[#FFD60A] border-2 border-black rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                    +
                </button>
            </div>

            {open && (
                <AvatarModal
                    open={open}
                    setOpen={setOpen}
                    close={() => setOpen(false)}
                    userId={profile?.id}
                    onSuccess={(newUrl) => setSrc(newUrl)}
                />
            )}
        </>
    );
}