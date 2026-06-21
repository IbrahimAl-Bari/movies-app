"use client"

import React, { useState } from "react"
import { Plus, X } from "lucide-react"
import CreatePost from "./CreatePost" // Your existing component

export default function PostPlus() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="absolute flex justify-end p-2 md:p-6 right-0 max-sm:relative">
            {/* The Plus Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#FFD60A] rounded-full max-sm:p-2 p-4 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all"
                >
                    <Plus className="w-8 h-8 max-sm:h-4 max-sm:w-4 text-black stroke-[4px]" />
                </button>
            )}

            {/* The Form (Visible only when open) */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-12 right-0 bg-[#FF4D4D] cursor-pointer p-1 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_#000]"
                        >
                            <X className="w-6 h-6 text-black" />
                        </button>

                        <CreatePost onSuccess={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}