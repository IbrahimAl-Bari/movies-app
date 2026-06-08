"use client";

import { useState, useEffect } from "react";
import type { ApiResponse, ApiTitle, TitleItem, GalleryItem } from "@/app/lib/types";

function extractRating(rating: ApiTitle["rating"]): number {
    if (typeof rating === "number") return rating;
    if (typeof rating === "string") return Number(rating) || 0;
    if (rating && typeof rating === "object") {
        return Number(rating.aggregateRating) || 0;
    }
    return 0;
}

function mapApiTitleToItem(t: ApiTitle): TitleItem {
    return {
        id: t.id ?? Math.random().toString(36).slice(2),
        type: t.type ?? "movie",
        primaryImage: t.primaryImage?.url ?? "",
        rating: extractRating(t.rating),
        originalTitle: t.originalTitle ?? "Untitled",
        startYear: String(t.startYear ?? ""),
    };
}

interface UseApiResult<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

export function useTitles(minRating = 7): UseApiResult<TitleItem[]> {
    const [data, setData] = useState<TitleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("/api/titles");
                if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
                const json: ApiResponse = await res.json();
                const titles = (json?.titles ?? [])
                    .map(mapApiTitleToItem)
                    .filter((t) => t.rating >= minRating);
                if (!cancelled) setData(titles);
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : "Failed to load titles");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, [minRating]);

    return { data, loading, error };
}

export function useCategories(): UseApiResult<GalleryItem[]> {
    const [data, setData] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("/api/titles");
                if (!res.ok) throw new Error("Failed to fetch data");
                const json: ApiResponse = await res.json();
                const titles = json?.titles ?? [];

                const genres = ["Action", "Sci-Fi", "Horror", "Comedy", "Drama", "Animation"];
                const bestByGenre: Record<string, ApiTitle> = {};
                const usedImages = new Set<string>();

                for (const title of titles) {
                    if (title.type !== "tvSeries") continue;
                    for (const genre of title.genres ?? []) {
                        if (!genres.includes(genre)) continue;
                        if (bestByGenre[genre]) continue;
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
                        return { image: t.primaryImage.url, text: genre };
                    })
                    .filter((item): item is GalleryItem => item !== null);

                if (!cancelled) setData(items);
            } catch (err) {
                if (!cancelled) {
                    setError("Could not load categories");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, []);

    return { data, loading, error };
}