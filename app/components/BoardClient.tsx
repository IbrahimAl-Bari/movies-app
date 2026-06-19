"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Star, CircleArrowLeft } from "lucide-react";

export function BoardClient({ data }: { data: any[] }) {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 480);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const positions = isMobile
        ? [
            { x: -0, y: 0, rotate: -8 },
            { x: 0, y: -0, rotate: 6 },
            { x: 0, y: 0, rotate: -3 },
            { x: -0, y: 0, rotate: 7 },
            { x: 0, y: 0, rotate: -5 },
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
                <div className="mt-30 text-center text-white uppercase">
                    <h2 className="text-5xl max-sm:text-4xl font-black">All The Popular Series</h2>
                    <div className="flex items-center justify-center gap-2 mt-5 opacity-50 max-md:text-[#FFD60A] max-md:opacity-100">
                        <CircleArrowLeft className="w-4 h-4" />
                        <span>Drag To Move</span>
                    </div>
                </div>
            </div>

            <div className="contents">

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
                            className="absolute z-10 cursor-grab active:cursor-grabbing rounded-2xl">

                            <div className=" board-card rounded-[10px] bg-[#FFD60A] overflow-hidden border-r-10 border-b-10 border-black shadow-[10px_10px_0px_0px_#FF4D4D]">
                                <img
                                    src={item.primaryImage}
                                    alt={item.originalTitle || "Unknown Title"}
                                    className="w-40 mt-1 h-40 max-sm:h-25 max-md:w-30 max-md:h-30 object-cover rounded-[10px]"
                                    draggable={false}
                                />

                                <h5 className="text-center max-sm:text-xs font-black uppercase tracking-tight w-full mt-1 text-black text-sm px-2 truncate">
                                    {item.originalTitle || "Unknown Title"}
                                </h5>

                                <div className="w-full font-black uppercase tracking-tight mb-1 mt-1 flex justify-around text-black text-xs">
                                    <div className="flex gap-2">
                                        <Star className="text-black w-4 h-4 max-sm:w-3" />
                                        <span>{item.rating}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Calendar className="text-black w-4 h-4 max-sm:w-3" />
                                        <span>{item.startYear || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}