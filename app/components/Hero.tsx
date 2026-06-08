"use client";

import { Play, List, TvMinimalPlay } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import GridMotion from "./GridMotion";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

type ApiTitle = {
  type: string;
  genres?: string[];
  primaryImage?: {
    url?: string;
  };
  rating?: {
    aggregateRating?: number;
  } | number;
};

type ApiResponse = {
  titles: ApiTitle[];
};

interface TitleItem {
  id: string | number;
  type: string;
  primaryImage: string;
  rating: number;
  originalTitle: string;
  startYear: string;
}

export function Hero() {
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
      () => {
        gsap.from(".btn-watch", {
          boxShadow: "0px 0px 0px 0px #FF4D4D",
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.from(".btn-browse", {
          boxShadow: "0px 0px 0px 0px #FFD60A",
          duration: 0.6,
          ease: "power3.out",
        });
      },
      { scope: buttonsRef }
  );

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
      { scope: container }
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TitleItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/titles");
      if (!res.ok) throw new Error("Failed to fetch data");

      const json: ApiResponse = await res.json();

      const titles: TitleItem[] = (json?.titles ?? []).filter((t) => {
        const ratingValue =
            typeof t.rating === "object" && t.rating !== null
                ? t.rating.aggregateRating ?? 0
                : typeof t.rating === "number"
                    ? t.rating
                    : 0;

        return ratingValue >= 7;
      });

      setData(titles);
    } catch (err) {
      setError("Could not Background");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
      <section
          ref={container}
          className="relative overflow-hidden border-b-[6px] h-screen w-screen z-0 border-black bg-[#111111]"
      >
        <GridMotion
            items={data.map((m) => m.primaryImage?.url ?? "Unknown")}
            gradientColor="black"
        />

        <div className="h-full z-10 w-full flex-col py-20 px-6 justify-center items-center">
          <h1
              className="fade-in mb-7 text-center font-black uppercase text-white"
              style={{
                fontSize: "4rem",
                fontWeight: 900,
                lineHeight: 0.9,
              }}
          >
            Discover Your <br /> Next Favorite Movie
          </h1>

          <p
              className="paragraph mb-8 text-center font-bold leading-relaxed text-white/70"
              style={{ fontSize: "1.25rem", fontWeight: 700 }}
          >
            Stream thousands of blockbusters, indie gems, <br /> and cult classics.
            Your ultimate cinematic experience starts here.
          </p>

          <div
              ref={buttonsRef}
              className="mt-10 flex justify-center flex-wrap gap-4"
          >
            <button className="btn-watch flex items-center gap-2 border-4 border-black bg-[#FFD60A] px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FF4D4D] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FF4D4D]">
              <TvMinimalPlay className="h-6 w-6 fill-black" />
              Watch Now
            </button>

            <button className="btn-browse flex items-center gap-2 border-4 border-black bg-white px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FFD60A] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FFD60A]">
              <List className="h-6 w-6" />
              Browse Collection
            </button>
          </div>
        </div>
      </section>
  );
}