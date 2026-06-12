"use client";

import { List, TvMinimalPlay } from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import GridMotion from "./GridMotion";
import { ErrorBoundary } from "./ErrorBoundary";
import Loading from "@/app/loading";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

// ─── API Types ─────────────────────────────────────────────

type ApiRating =
    | {
    aggregateRating?: number;
}
    | number;

type ApiTitle = {
    id?: string | number;
    type?: string;
    genres?: string[];
    primaryImage?: {
        url?: string;
    };
    rating?: ApiRating;
    originalTitle?: string;
    startYear?: string | number;
};

type ApiResponse = {
    titles?: ApiTitle[];
};

// ─── Component Types ───────────────────────────────────────

interface TitleItem {
    id: string | number;
    type: string;
    genres: string[];
    primaryImage: string;
    rating: number;
    originalTitle: string;
    startYear: string;
}

// ─── Helper: Extract numeric rating ──────────────────────

function extractRating(rating: ApiRating | undefined): number {
    if (typeof rating === "number") return rating;
    if (rating && typeof rating === "object") {
        return rating.aggregateRating ?? 0;
    }
    return 0;
}

// ─── Helper: Map API title to component shape ──────────────

function mapApiTitleToItem(t: ApiTitle): TitleItem {
    return {
        id: t.id ?? Math.random().toString(36).slice(2),
        type: t.type ?? "movie",
        genres: t.genres ?? [],
        primaryImage: t.primaryImage?.url ?? "",
        rating: extractRating(t.rating),
        originalTitle: t.originalTitle ?? "Untitled",
        startYear: String(t.startYear ?? ""),
    };
}

// ─── Component ─────────────────────────────────────────────

export function Hero() {
    const buttonsRef = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLElement>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<TitleItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading) return;

        const prevent = (e: TouchEvent) => e.preventDefault();

        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", prevent, { passive: false });

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("touchmove", prevent);
        };
    }, [loading]);


    function preloadImages(urls: string[]): Promise<void> {
        return new Promise((resolve) => {
            let loaded = 0;

            if (urls.length === 0) return resolve();

            urls.forEach((url) => {
                const img = new Image();

                img.src = url;

                img.onload = img.onerror = () => {
                    loaded++;
                    if (loaded === urls.length) {
                        resolve();
                    }
                };
            });
        });
    }


    const fetchData = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/titles");
            if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);

            const json: ApiResponse = await res.json();
            const apiTitles = json?.titles ?? [];

            const allowedGenres = ["Action", "Thriller", "Crime", "War", "Comedy"];

            const titles: TitleItem[] = apiTitles
                .map(mapApiTitleToItem)
                .filter((t) =>
                    t.rating >= 6.8 &&
                    t.genres?.some((g) => allowedGenres.includes(g))
                );

            setData(titles);

            const imageUrls = titles.map((m) => m.primaryImage).filter(Boolean);

            await preloadImages(imageUrls);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not load background");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    const imageUrls = data.map((m) => m.primaryImage).filter(Boolean);

    useGSAP(
        () => {
            const split = SplitText.create(".fade-in", {
                type: "chars, words, lines",
            });

            gsap.from(split.words, {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(".paragraph", {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out",
            });

            return () => {
                split.revert();
            };
        },
        {scope: container}
    );

    return (
        <>
            <section
                ref={container}
                className="relative overflow-hidden border-b-[6px] h-screen w-screen z-0 border-black bg-[#111111]"
            >
                <ErrorBoundary>
                    <GridMotion items={imageUrls} gradientColor="black"/>
                </ErrorBoundary>

                <div className="h-full z-10 w-full flex flex-col py-20 px-6 justify-center items-center">
                    <h1
                        className="fade-in mb-7 text-center font-black uppercase text-white"
                        style={{
                            fontSize: "4rem",
                            fontWeight: 900,
                            lineHeight: 0.9,
                        }}
                    >
                        Discover Your <br/> Next Favorite Movie
                    </h1>

                    <p
                        className="paragraph mb-8 text-center font-bold leading-relaxed text-white/70"
                        style={{fontSize: "1.25rem", fontWeight: 700}}
                    >
                        Stream thousands of blockbusters, indie gems, <br/> and cult
                        classics. Your ultimate cinematic experience starts here.
                    </p>

                    <div
                        ref={buttonsRef}
                        className="mt-10 flex justify-center flex-wrap gap-4"
                    >
                        <button
                            className="btn-watch flex items-center gap-2 border-4 border-black bg-[#FFD60A] px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FF4D4D] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FF4D4D]">
                            <TvMinimalPlay className="h-6 w-6 fill-black"/>
                            Watch Now
                        </button>

                        <button
                            className="btn-browse flex items-center gap-2 border-4 border-black bg-white px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FFD60A] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FFD60A]">
                            <List className="h-6 w-6"/>
                            Browse Collection
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}