import React from 'react'
import { Calendar, Clock4, Star } from "lucide-react";
import SeeLess from "@/app/collection/components-collection/SeeLess";

const Page = async () => {

    async function getImdbMoviesByGenre(genre: string) {
        try {
            const res = await fetch(`https://api.imdbapi.dev/titles?startYear=1900&endYear=2026&minVoteCount=700000&maxVoteCount=1000000&minAggregateRating=8&maxAggregateRating=10&sortBy=SORT_BY_POPULARITY&sortOrder=ASC`, {
                next: { revalidate: 3600 }
            });

            if (!res.ok) return [];
            const data = await res.json();

            return data.titles || data.results || [];
        } catch (error) {
            console.error(`Failed fetching ${genre} movies:`, error);
            return [];
        }
    }

    const ActionMovies = await getImdbMoviesByGenre("Action");

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
                        {ActionMovies.length > 0 ? ActionMovies.slice(0, 20).map((movie: any) => {

                            const title = movie.primaryTitle || movie.title || "Untitled Masterpiece";

                            const imgUrl = movie.primaryImage?.url || movie.posterUrl || null;

                            const ratingData = movie.rating || movie.imdbRating;
                            const rating = typeof ratingData === 'object' && ratingData !== null
                                ? ratingData.aggregateRating : (ratingData || "N/A");

                            const totalMinutes = Math.floor((movie.runtimeSeconds || 0) / 60)
                            const hours = Math.floor(totalMinutes / 60)
                            const remainingMinutes = totalMinutes % 60
                            const formattedRuntime = hours > 0
                                ? `${hours}H ${remainingMinutes}M`
                                : `${totalMinutes}M`

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
                                        <h4 className="text-white text-center font-black uppercase tracking-tight text-sm md:text-base leading-tight line-clamp-2" title={title}>
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
                        }) : (
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