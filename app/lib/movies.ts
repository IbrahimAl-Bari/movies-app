import { createClient } from "@/app/utils/supabase/server";

export type Movie = {
    id: string;
    title: string;
    genres: string;
    averageRating: number;
    runtimeMinutes: number,
    year: number,
    poster?: string;
};

export async function getMovies(
    genre: string,
    number: number
): Promise<Movie[]> {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("movies")
        .select("*")

    if (error) {
        console.error(error);
        return [];
    }

    const response = data
        .filter((m) => !genre || m.genres?.includes(genre))
        .slice(0, number);

    return response ?? [];

}