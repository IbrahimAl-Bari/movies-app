"use client";

import { useState } from "react";
import AvatarModal from "./AvatarModal";

export default function AvatarButton({ currentUrl }: { currentUrl?: string }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="relative w-28 h-28">
                <img
                    src={currentUrl || "/no-image.png"}
                    className="w-28 h-28 rounded-full border-4 border-black object-cover"
                />

                <button
                    onClick={() => setOpen(true)}
                    className="absolute text-black font-black bottom-0 right-0 w-8 h-8 bg-[#FFD60A] border-2 border-black rounded-full flex items-center justify-center"
                >
                    +
                </button>
            </div>

            {open && (
                <AvatarModal
                    open={open}
                    setOpen={setOpen}
                    close={() => setOpen(false)}
                />
            )}
        </>
    );
}