"use client";

import { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { uploadAvatar } from "@/app/lib/uploadAvatar";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
    close: () => void;
};

export default function AvatarModal({ close, open, setOpen }: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleFile(file: File) {
        if (!file) return;

        setLoading(true);

        try {
            // 🔥 Compress image before upload
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 0.25,            // ~250KB target
                maxWidthOrHeight: 512,      // perfect for avatars
                useWebWorker: true,
                fileType: "image/webp",     // modern + small
            });

            const res = await uploadAvatar(compressedFile);

            if (res?.error) {
                alert(res.error);
                return;
            }

            close();
        } catch (err) {
            console.error(err);
            alert("Image compression failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        if (open) window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, [open, setOpen]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#111] w-[90%] max-w-md p-6 rounded-xl border-4 border-black">
                <h3 className="text-white font-black mb-4">
                    Update Profile Picture
                </h3>

                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFile(file);
                    }}
                    className="border-2 border-dashed border-gray-600 p-6 text-center rounded-lg cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                >
                    <p className="text-white/70">
                        Drag & drop image or tap to upload
                    </p>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                    }}
                />

                <div className="flex gap-3 mt-4">
                    <button
                        onClick={close}
                        className="flex-1 bg-black border border-gray-600 text-white py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => inputRef.current?.click()}
                        className="flex-1 bg-[#FFD60A] text-black font-black py-2 rounded"
                    >
                        Choose File
                    </button>
                </div>

                {loading && (
                    <p className="text-center text-white/70 mt-3">
                        Uploading...
                    </p>
                )}
            </div>
        </div>
    );
}