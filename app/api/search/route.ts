import { NextResponse } from "next/server";

const cache = new Map<string, any[]>();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    if (cache.has(query)) {
        return NextResponse.json({ results: cache.get(query) });
    }

    const API_KEY = process.env.TMDB_KEY; // server-side key (NOT NEXT_PUBLIC)
    const BASE_URL = "https://api.themoviedb.org/3";

    const res = await fetch(
        `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    );

    if (!res.ok) {
        return NextResponse.json({ results: [] }, { status: 500 });
    }

    const data = await res.json();
    console.log(data)

    const movies = data.results.slice(0, 3).map((movie: any) => ({
        id: movie.id,
        title: movie.title || movie.original_name,
        year: movie.release_date?.split("-")[0]  || movie.first_air_date?.split("-")[0] || "N/A",
        poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "/no-image.png",
    }));

    cache.set(query, movies);

    return NextResponse.json({ results: movies });
}