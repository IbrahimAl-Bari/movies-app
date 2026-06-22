"use client";

import { useEffect, useState } from "react";
import AvatarModal from "./AvatarModal";

interface Profile {
    id: string;
    username: string;
    avatar_url?: string;
}

interface Props {
    profile: Profile | null;
}

export default function AvatarButton({ profile }: Props) {
    const [open, setOpen] = useState(false);

    const currentUrl = profile?.avatar_url;

    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile?.username ?? "User"
    )}&background=FFD60A&color=000&bold=true`;

    const [src, setSrc] = useState<string>(currentUrl || fallback);

    useEffect(() => {
        if (!currentUrl) {
            setSrc(fallback);
            return;
        }

        setSrc(`${currentUrl}?v=${Date.now()}`);
    }, [currentUrl, fallback]);

    return (
        <>
            <div className="relative w-28 h-28">
                <img
                    src={src}
                    alt="avatar"
                    className="w-28 h-28 rounded-full border-4 border-black object-cover bg-white"
                />

                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="absolute text-black font-black bottom-0 right-0 w-8 h-8 bg-[#FFD60A] border-2 border-black rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                    +
                </button>
            </div>

            {open && profile && (
                <AvatarModal
                    open={open}
                    setOpen={setOpen}
                    close={() => setOpen(false)}
                    userId={profile.id}
                    onSuccess={(newUrl: string) => setSrc(newUrl)}
                />
            )}
        </>
    );
}