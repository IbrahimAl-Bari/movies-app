import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
    const res = await fetch("https://imdb236.p.rapidapi.com/api/imdb/top250-movies", {
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
            "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
        },
    });

    const data = await res.json();

    const supabase = await createClient();

    const payload = data.map((movie: any) => ({
        id: movie.id,
        title: movie.primaryTitle,
        genres: movie.genres?.join(","),
        averageRating: movie.averageRating,
        numVotes:
            movie.numVotes ??
            movie.voteCount ??
            movie.imdbVotes ??
            0,
        poster: movie.primaryImage,
        runtimeMinutes: movie.runtimeMinutes,
        year: movie.startYear
    }));

    const { error } = await supabase.from("movies").upsert(payload);

    if (error) {
        console.error("Sync error:", error);
    }

    return Response.json({ success: true });
}