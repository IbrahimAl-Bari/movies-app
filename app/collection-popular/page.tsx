import React from 'react'
import SeeLess from "@/app/collection/components-collection/SeeLess";
import MovieCard from "@/app/collection/components-collection/MovieCard";

const Page = async () => {

    async function getPopularMovies() {
        try {
            const res = await fetch(`https://api.imdbapi.dev/titles?startYear=1900&endYear=2026&minVoteCount=700000&maxVoteCount=1000000&minAggregateRating=8&maxAggregateRating=10&sortBy=SORT_BY_POPULARITY&sortOrder=ASC`, {
                next: { revalidate: 3600 }
            });

            if (!res.ok) return [];
            const data = await res.json();

            return data.titles || data.results || [];
        } catch (error) {
            console.error('Failed fetching popular movies:', error);
            return [];
        }
    }

    const ActionMovies = await getPopularMovies();

    return (
        <section className="min-h-screen bg-[#111111] pb-24 px-4 md:px-8 selection:bg-[#FFD60A] selection:text-black">
            <div className="max-w-7xl mx-auto space-y-16 pt-12">
                <div className="p-6">

                    <div className="flex justify-between items-end mb-8 border-b-4 border-[#333] pb-4">
                        <h3 className="text-white text-2xl md:text-3xl font-black tracking-tighter uppercase">
                            Most Popular On Cinematix
                        </h3>
                        <SeeLess url={"/collection"} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6">
                        {ActionMovies.length > 0 ? ActionMovies.slice(0, 20).map((movie: any) => (
                            <MovieCard key={movie.id || movie.imdbId} movie={movie} />
                        )) : (
                            <div className="col-span-full">
                                <p className="text-neutral-500 uppercase font-black tracking-tight p-4 border-4 border-dashed border-neutral-700 text-center">
                                    No data returned from API
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page