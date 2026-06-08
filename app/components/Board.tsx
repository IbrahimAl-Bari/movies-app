"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Star, CircleArrowLeft } from "lucide-react";
import { BoardSkeleton } from "./Skeleton";
import { useTitles } from "@/app/hooks/useApi";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return isMobile;
}

export default function Board() {
    const { data, loading, error } = useTitles(8.6);
    const isMobile = useIsMobile();

    if (loading) return <BoardSkeleton />;
    if (error) return (
        <div className="w-full h-175 flex items-center justify-center bg-[#0f0f12] text-red-400">
            {error}
        </div>
    );

    const positions = isMobile
        ? [
            { x: -90, y: -120, rotate: -8 },
            { x: 90, y: -60, rotate: 6 },
            { x: 0, y: 20, rotate: -3 },
            { x: -90, y: 110, rotate: 7 },
            { x: 90, y: 170, rotate: -5 },
        ]
        : [
            { x: -400, y: -20, rotate: -8 },
            { x: -200, y: 100, rotate: 5 },
            { x: 0, y: 0, rotate: -2 },
            { x: 200, y: 100, rotate: 7 },
            { x: 400, y: -20, rotate: -6 },
        ];

    return (
        <div className="relative w-full h-175 overflow-hidden bg-[#0f0f12] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-[#111111]"
                style={{
                    backgroundImage: `
            radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%),
            linear-gradient(rgba(255,214,10,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,214,10,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "auto, 40px 40px, 40px 40px",
                }}
            />

            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="absolute inset-0 z-50 pointer-events-none">
                <div className="mt-30 text-center">
                    <h2 className="text-5xl font-black">All The Popular Series</h2>

                    <div className="flex items-center justify-center gap-2 mt-5 opacity-50">
                        <CircleArrowLeft className="w-4 h-4" />
                        <span>Drag To Move</span>
                    </div>
                </div>
            </div>

            {data.slice(0, 5).map((item, index) => {
                const position = positions[index] ?? { x: 0, y: 0, rotate: 0 };

                return (
                    <motion.div
                        key={item.id}
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        whileDrag={{ scale: 1.05, zIndex: 50 }}
                        initial={{ x: position.x, y: position.y, rotate: position.rotate }}
                        className="absolute z-10 cursor-grab active:cursor-grabbing rounded-2xl"
                    >
                        <div className="w-45 h-60 rounded-[10px] bg-[#FFD60A] overflow-hidden border-r-10 border-b-10 border-black shadow-[10px_10px_0px_0px_#FF4D4D]">
                            <img
                                src={item.primaryImage}
                                alt={item.originalTitle || "Unknown Title"}
                                className="w-40 mx-auto mt-1 h-40 object-cover rounded-[10px]"
                                draggable={false}
                            />

                            <h3 className="text-center font-black uppercase tracking-tight w-full mt-1 text-black text-sm px-2 truncate">
                                {item.originalTitle || "Unknown Title"}
                            </h3>

                            <div className="w-full font-black uppercase tracking-tight mt-1 flex justify-around text-black text-xs">
                                <div className="flex gap-2">
                                    <Star className="text-black w-4 h-4" />
                                    <span>{item.rating}</span>
                                </div>

                                <div className="flex gap-2">
                                    <Calendar className="text-black w-4 h-4" />
                                    <span>{item.startYear || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}