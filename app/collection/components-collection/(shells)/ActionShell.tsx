import React from "react";
import SeeMore from "@/app/collection/components-collection/SeeMore";
import MovieCard from "@/app/collection/components-collection/MovieCard";
import {getMovies} from "@/app/lib/movies";
import {Movie} from "@/app/(COLLECTIONS)/collection-action/page";

const PopularShell = async () => {

    const ActionMovies = await getMovies("Action" , 5)

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
                <div>
                    <h3 className="text-white max-sm:text-center font-black tracking-tighter">
                        Action Choices :
                    </h3>
                </div>

                <SeeMore url="/collection-action" />
            </div>

            {ActionMovies.length > 0 ? (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-6">
                    {ActionMovies.map((movie: any) => (
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