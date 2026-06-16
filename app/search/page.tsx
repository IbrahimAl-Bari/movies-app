"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MovieCard from "@/app/collection/components-collection/MovieCard";
import {CircleSlash2, Search} from "lucide-react"
import Loading from "@/app/loading";
import SearchBar from "@/app/watch/SearchBar";
import SeeMore from "@/app/collection/components-collection/SeeMore";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const router = useRouter();

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!query || query.trim() === "") {
            router.back();
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            const res = await fetch(`/api/search?query=${query}`);
            const data = await res.json();
            setResults(data.results || []);
            setLoading(false);
        };
        fetchResults();
    }, [query, router]);

    if (!query || query.trim() === "") return null;

    return (
        <section className="all-games mt-8">
            {loading ? (
                <h2 className="text-white text-xl">Searching...</h2>
            ) : results.length === 0 ? (
                <div className={"text-white w-screen text-center mt-28"}>
                    <CircleSlash2 className={"w-20 h-20 text-red-200 mx-auto m-6"}/>
                    <h3> No Titles Were Found Matching "{query}"</h3>
                    <p className={"text-white/50"}>try reloading or searching for a another title</p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                </ul>
            )}
        </section>
    );
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    return (
        <section className="relative overflow-hidden border-b-[6px] h-screen w-screen z-0 border-black bg-[#111111] px-6">
                <div className={"w-full h-full"}>

                    <SearchBar />

                    <div className="flex justify-between mt-5 rounded-4xl gap-2 items-center">
                                <h3 className="text-white text-2xl md:text-3xl font-black" style={{lineHeight: "0.5"}}>Search Results For "{query}" :</h3>
                        <SeeMore url="/collection-action" />
                    </div>


                    <Suspense fallback={<Loading />}>
                        <SearchResults />
                    </Suspense>
                </div>

        </section>
    );
}