"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "@/app/collection/components-collection/MovieCard"
import SeeLess from "@/app/collection/components-collection/SeeLess";

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch("/api/movies");
            const data = await res.json();
            setMovies(data.results || []);
            console.log(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <section className="min-h-screen bg-[#111111] pb-24 px-4 md:px-8 selection:bg-[#FFD60A] selection:text-black">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="p-6">

                    <div className="flex-col justify-center items-center mb-8 border-b-4 border-[#FFD60A] pb-4">
                        <h1 className={"p-3 text-white text-center font-black tracking-tighter uppercase"}>Weclcome to Watching</h1>
                        <p className={"text-center text-white/70"}>the perfect place to watch all your favourite movies</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6">
                        {movies.length > 0 ? movies.slice(0, 30).map((movie: any) => (
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
    );
}