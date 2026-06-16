import { BoardClient } from "./BoardClient";
import type {ApiResponse, ApiTitle, TitleItem} from "@/app/lib/types";

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

async function getBoardData(): Promise<TitleItem[]> {
    try {
        const res = await fetch(`https://api.imdbapi.dev/titles` ,
            { next: { revalidate: 86400 } }
            );

        if (!res.ok) return [];

        const json: ApiResponse = await res.json();

        return (json?.titles ?? [])
            .map(mapApiTitleToItem)
            .filter((t) => t.rating >= 8.6);

    } catch (error) {
        console.error("Failed to fetch board data:", error);
        return [];
    }
}

export default async function Board() {
    const titles = await getBoardData();

    return <BoardClient data={titles.slice(0, 5)} />;
}