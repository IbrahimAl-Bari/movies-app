import { HeroClient } from "./HeroClient";

async function getMovies() {
    const res = await fetch("https://api.imdbapi.dev/titles");
    if (!res.ok) return [];

    const json = await res.json();
    const apiTitles = json?.titles ?? [];
    const allowedGenres = ["Action", "Thriller", "Crime", "War", "Comedy"];

    return apiTitles
        .map((t: any) => ({
            id: t.id ?? Math.random().toString(36).slice(2),
            type: t.type ?? "movie",
            genres: t.genres ?? [],
            primaryImage: t.primaryImage?.url ?? "",
            rating: (typeof t.rating === "number" ? t.rating : t.rating?.aggregateRating) ?? 0,
            originalTitle: t.originalTitle ?? "Untitled",
            startYear: String(t.startYear ?? ""),
        }))
        .filter((t: any) => t.rating >= 6.5 && t.genres?.some((g: string) => allowedGenres.includes(g)));
}

export default async function Hero() {
    const data = await getMovies();
    return <HeroClient initialData={data} />;
}