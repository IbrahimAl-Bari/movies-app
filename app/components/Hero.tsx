import { HeroClient } from "./HeroClient";
import { getMovies } from "@/app/lib/movies";

async function getHeroMovies() {

    // @ts-ignore
    const data = (await getMovies(undefined, 200))
        .filter((m) => m.year >= 2010);

    const allowedGenres = ["Action", "Thriller", "Crime", "War", "Comedy"];

    return data
        .filter((t: any) => {
            const genres =
                typeof t.genres === "string"
                    ? t.genres.split(",")
                    : t.genres;

            return genres?.some((g: string) =>
                allowedGenres.includes(g.trim())
            );
        })
        .map((m: any) => m.poster)
}

export default async function Hero() {
    const images = await getHeroMovies();
    console.log(images)
    return <HeroClient initialData={images} />;
}