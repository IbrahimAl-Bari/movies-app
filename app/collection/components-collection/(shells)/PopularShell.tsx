import React from "react";
import SeeMore from "@/app/collection/components-collection/SeeMore";
import MovieCard from "@/app/components/MovieCard";

const PopularShell = async () => {
    async function getImdbMoviesByGenre() {
        try {
            const res = await fetch(
                "https://api.imdbapi.dev/titles?startYear=1900&endYear=2026&minVoteCount=100000&minAggregateRating=8&maxAggregateRating=10&sortBy=SORT_BY_POPULARITY&sortOrder=ASC",
                {
                    next: {
                        revalidate: 7200,
                    },
                }
            );

            if (!res.ok) return [];

            const data = await res.json();
            return data.titles || [];
        } catch (error) {
            console.error("Failed fetching popular movies:", error);
            return [];
        }
    }

    const PopularMovies = await getImdbMoviesByGenre();

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
                <div>
                    <h3 className="text-white max-sm:text-center font-black tracking-tighter">
                        Most Popular On Cinematix
                    </h3>
                </div>

                <SeeMore url="/collection-popular" />
            </div>

            {PopularMovies.length > 0 ? (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6">
                    {PopularMovies.slice(0, 5).map((movie: any) => (
                        <MovieCard key={movie.id || movie.imdbId} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="text-neutral-500 uppercase font-black tracking-tight">
                    No data returned from API
                </p>
            )}
        </section>
    );
};

export default PopularShell;