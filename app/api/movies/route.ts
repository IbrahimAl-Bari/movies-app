import { NextResponse } from "next/server";

const cache = new Map<string, any[]>();

export async function GET() {
    const cacheKey = "discover";

    if (cache.has(cacheKey)) {
        return NextResponse.json({ results: cache.get(cacheKey) });
    }

    const API_KEY = process.env.TMDB_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=1000`
    );

    if (!res.ok) {
        return NextResponse.json({ results: [] }, { status: 500 });
    }

    const data = await res.json();

    const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        primaryTitle: movie.title,
        year: movie.release_date?.split("-")[0] || "N/A",
        poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
        averageRating: movie.vote_average,
    }));

    cache.set(cacheKey, movies);

    return NextResponse.json({ results: movies });
}