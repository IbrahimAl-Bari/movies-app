"use client";

import { List, TvMinimalPlay } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import GridMotion from "./GridMotion";
import { ErrorBoundary } from "./ErrorBoundary";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

export function HeroClient({ initialData }: { initialData: any[] }) {
    const container = useRef<HTMLElement>(null);
    const router = useRouter();
    const imageUrls = initialData.filter(Boolean);

    useGSAP(() => {
        const split = SplitText.create(".fade-in", { type: "chars, words, lines" });
        gsap.from(split.words, { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out" });
        gsap.from(".paragraph", { opacity: 0, y: 20, duration: 1, ease: "power3.out" });
        return () => split.revert();
    }, { scope: container });

    return (
        <section ref={container} className="relative overflow-hidden border-b-[6px] h-screen w-screen z-0 border-black bg-[#111111]">
            <ErrorBoundary>
                <GridMotion items={imageUrls} gradientColor="black" />
            </ErrorBoundary>

            <div className="h-full z-10 w-full flex flex-col py-20 px-6 justify-center items-center">
                <h1 className="fade-in mb-7 text-center uppercase text-white">
                    Discover Your <br /> Next Favorite Movie
                </h1>
                <p className="paragraph mb-8 text-center font-bold leading-relaxed text-white/70">
                    Stream thousands of blockbusters, indie gems, <br /> and cult classics.
                </p>

                <div className="mt-10 flex justify-center flex-wrap gap-4">
                    <button onClick={() => router.push("/collection")} className="btn-watch flex items-center gap-2 border-4 border-black bg-[#FFD60A] px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FF4D4D] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FF4D4D]">
                        <TvMinimalPlay className="h-6 w-6 fill-black" /> Watch Now
                    </button>
                    <button onClick={() => router.push("/collection")} className="btn-browse flex items-center gap-2 border-4 border-black bg-white px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FFD60A] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FFD60A]">
                        <List className="h-6 w-6" /> Browse Collection
                    </button>
                </div>
            </div>
        </section>
    );
}