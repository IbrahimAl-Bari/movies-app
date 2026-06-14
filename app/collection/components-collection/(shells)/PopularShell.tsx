import React from "react";
import SeeMore from "@/app/collection/components-collection/SeeMore";
import { Calendar, Clock4, Star } from "lucide-react";

const PopularShell = async () => {
    async function getImdbMoviesByGenre() {
        try {
            const res = await fetch(
                "https://api.imdbapi.dev/titles?startYear=1900&endYear=2026&minVoteCount=700000&maxVoteCount=1000000&minAggregateRating=8&maxAggregateRating=10&sortBy=SORT_BY_POPULARITY&sortOrder=ASC",
                {
                    next: {
                        revalidate: 3600,
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

                    {PopularMovies.slice(0, 5).map((movie: any) => {
                        const fullTitle =
                            movie.primaryTitle || "Untitled Masterpiece";

                        const title =
                            fullTitle.length > 20
                                ? fullTitle.slice(0, 20) + "..."
                                : fullTitle;

                        const imgUrl = movie.primaryImage?.url || null;

                        const rating =
                            movie.rating?.aggregateRating ?? "N/A";

                        const totalMinutes = Math.floor(
                            (movie.runtimeSeconds || 0) / 60
                        );

                        const hours = Math.floor(totalMinutes / 60);
                        const remainingMinutes = totalMinutes % 60;

                        const formattedRuntime =
                            hours > 0
                                ? `${hours}H ${remainingMinutes}M`
                                : `${totalMinutes}M`;

                        return (
                            <div
                                key={movie.id || movie.imdbId}
                                className="flex flex-col border-[3px] md:border-4 border-black bg-[#1a1a1a] shadow-[6px_6px_0px_0px_#FFD60A] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#FFD60A] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_#FFD60A] transition-all duration-150 group cursor-pointer"
                            >
                                <div className="h-[260px] border-b-[3px] md:border-b-4 border-black relative overflow-hidden bg-neutral-800">
                                    {imgUrl ? (
                                        <img
                                            src={imgUrl}
                                            alt={title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center p-4 font-black text-center text-xs uppercase tracking-tight text-white">
                                            No Image
                                        </div>
                                    )}

                                    <div className="absolute top-2 right-2 border-2 flex items-center gap-1 border-black bg-[#FFD60A] px-1.5 py-0.5 text-xs font-black text-black shadow-[3px_3px_0px_0px_#000000]">
                                        <Star className="w-3 h-3 fill-black" />
                                        {rating}
                                    </div>
                                </div>

                                <div className="p-3 flex flex-col grow justify-between gap-3">
                                    <h4 className="text-white text-center font-black uppercase tracking-tight leading-tight line-clamp-2" title={title}>
                                        {title}
                                    </h4>

                                    <div className="text-xs font-bold flex justify-between text-gray-300">
                                        {movie.runtimeSeconds && (
                                            <span className="flex items-center gap-1.5">
                                                    <Clock4 className="w-3.5 h-3.5 text-[#FFD60A]" />
                                                {formattedRuntime}
                                                </span>
                                        )}
                                        {movie.startYear && (
                                            <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-[#FFD60A]" />
                                                {movie.startYear}
                                                </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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