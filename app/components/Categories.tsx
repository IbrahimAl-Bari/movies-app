"use client";

import CircularGallery from "./CircularGallery";
import { useEffect, useState } from "react";

type Genre = string;

type GalleryItem = {
  image: string;
  text: string;
};

type ApiTitle = {
  type: string;
  genres?: string[];
  primaryImage?: {
    url?: string;
  };
  rating?: {
    aggregateRating?: number;
  };
};

type ApiResponse = {
  titles: ApiTitle[];
};

export function Categories() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const genres: Genre[] = [
    "Action",
    "Sci-Fi",
    "Horror",
    "Comedy",
    "Drama",
    "Animation",
  ];

  async function fetchData(): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/titles");
      if (!res.ok) throw new Error("Failed to fetch data");

      const data: ApiResponse = await res.json();
      const titles = data?.titles ?? [];

      const bestByGenre: Record<string, ApiTitle> = {};

      const usedImages = new Set<string>();

      for (const title of titles) {
        if (title.type !== "tvSeries") continue;

        for (const genre of title.genres ?? []) {
          if (!genres.includes(genre)) continue;
          if (bestByGenre[genre]) continue; // already filled this genre

          const imageUrl = title.primaryImage?.url;
          if (!imageUrl || usedImages.has(imageUrl)) continue;

          bestByGenre[genre] = title;
          usedImages.add(imageUrl);
        }
      }

      const items: GalleryItem[] = genres
          .map((genre) => {
            const t = bestByGenre[genre];
            if (!t?.primaryImage?.url) return null;

            return {
              image: t.primaryImage.url,
              text: genre,
            };
          })
          .filter(Boolean) as GalleryItem[];

      setGalleryItems(items);
    } catch (err) {
      setError("Could not load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  if (loading) {
    return (
        <section className="border-b-[6px] border-black bg-[#111111] px-6 py-10">
          <p className="text-white text-center">Loading categories...</p>
        </section>
    );
  }

  if (error) {
    return (
        <section className="border-b-[6px] border-black bg-[#111111] px-6 py-10">
          <p className="text-red-400 text-center">{error}</p>
        </section>
    );
  }

  return (
      <section className="border-b-[6px] border-black bg-[#111111] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-4 inline-block border-4 border-black bg-[#FFD60A] px-4 py-2 shadow-[4px_4px_0px_0px_#FF4D4D]">
            <span className="font-black uppercase tracking-tight">
              Explore
            </span>
            </div>

            <h2
                className="font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: "3rem", fontWeight: 900 }}
            >
              Browse By Genre
            </h2>
          </div>

          <div style={{ height: "500px", position: "relative" }}>
            <CircularGallery
                items={galleryItems}
                bend={1}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollEase={0.05}
                scrollSpeed={2}
            />
          </div>
        </div>
      </section>
  );
}