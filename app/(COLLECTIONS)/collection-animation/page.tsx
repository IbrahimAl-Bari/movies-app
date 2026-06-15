import React from 'react'
import SeeLess from "@/app/collection/components-collection/SeeLess";
import MovieCard from "@/app/collection/components-collection/MovieCard";
import { getMovies } from "@/app/lib/movies";

export type Movie = {
    id: string;
    title: string;
    genres: string | string[];
    averageRating: number;
    poster?: string;
    year: number;
};

const Page = async () => {

    const Animation = await getMovies("Animation" , 30)

    return (
        <section className="min-h-screen bg-[#111111] pb-24 px-4 md:px-8 selection:bg-[#FFD60A] selection:text-black">
            <div className="max-w-7xl mx-auto space-y-16 pt-12">
                <div className="p-6">

                    <div className="flex justify-between items-end mb-8 border-b-4 border-[#333] pb-4">
                        <h3 className="text-white text-2xl md:text-3xl font-black tracking-tighter uppercase">
                            Action & Crime Choices
                        </h3>
                        <SeeLess url={"/collection"} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6">
                        {Animation.length > 0 ? Animation.slice(0, 20).map((movie: any) => (
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