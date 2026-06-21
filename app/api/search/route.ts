import { NextResponse } from "next/server";
import { rateLimit } from "@/app/lib/rate-limit";

const cache = new Map<
    string,
    {
        data: any[];
        expires: number;
    }
>();

const CACHE_TIME = 60 * 1000;

export async function GET(req: Request) {
    const ip =
        req.headers.get("x-forwarded-for") ||
        "unknown";

    if (!rateLimit(ip, 30, 60000)) {
        return NextResponse.json(
            { error: "Too many requests" },
            { status: 429 }
        );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const cached = cache.get(query);

    if (cached && cached.expires > Date.now()) {
        return NextResponse.json({
            results: cached.data,
        });
    }

    const API_KEY = process.env.TMDB_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    const res = await fetch(
        `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}`, {
            next: { revalidate: 60  }
        }
    );

    if (!res.ok) {
        return NextResponse.json({ results: [] }, { status: 500 });
    }

    const data = await res.json();

    const movies = data.results
        .filter(
            (item: any) =>
                item.media_type === "movie" ||
                item.media_type === "tv"
        )
        .slice(0, 10)
        .map((movie: any) => ({
            id: movie.id,

            title:
                movie.title ||
                movie.name ||
                movie.original_name,

            year:
                movie.release_date?.split("-")[0] ||
                movie.first_air_date?.split("-")[0] ||
                "N/A",

            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png",

            vote_average: movie.vote_average,
            vote_count: movie.vote_count,

            media_type: movie.media_type,

            release_date: movie.release_date,
            first_air_date: movie.first_air_date,
        }))

    cache.set(query, {
        data: movies,
        expires: Date.now() + CACHE_TIME,
    });

    return NextResponse.json({ results: movies });
}