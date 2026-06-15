"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Movie = {
    id: string;
    title: string;
    year: number;
    poster: string;
    actors?: string;
};

export default function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const fetchResults = async (value: string): Promise<void> => {
        setLoading(true);

        const res = await fetch(`/api/search?query=${value}`);
        const data = await res.json();
        console.log(data)

        setResults(data.results || []);
        setLoading(false);
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (search.length < 2) {
            setResults([]);
            return;
        }

        debounceRef.current = setTimeout(() => {
            fetchResults(search);
        }, 500);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search]);

    return (
        <div className="relative">
            <div className="flex items-center gap-2 border-4 rounded-4xl border-black px-2 py-1 shadow-[4px_4px_0px_0px_#000000]">
                <Search className="w-5 h-5" />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search"
                    className="flex-1 md:w-40 max-sm:w-20 bg-transparent font-bold text-white outline-none"
                />
            </div>

            {search.length >= 2 && (
                <div className="absolute mt-2 w-full rounded-sm bg-black z-50">
                    {loading && <p className="p-2 text-white">Loading...</p>}

                    {!loading &&
                        results.map((movie) => {
                            return (
                            <div
                                key={movie.id}
                                className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer"
                            >
                                <img
                                    src={movie.poster || "/no-image.png"}
                                    className="w-10 h-14 object-cover rounded-sm border"
                                    alt={movie.title}
                                />

                                <div className="text-white">
                                    <h5 className="font-bold">{movie.title}</h5>
                                    <p className="text-gray-400 text-xs">{movie.year}</p>
                                </div>
                            </div>
                            )})}
                </div>
            )}
        </div>
    );
}