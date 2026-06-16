"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Movie = { id: string; title: string; year: number; poster: string; };

export default function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setResults([]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchResults = async (value: string) => {
        setLoading(true);
        const res = await fetch(`/api/search?query=${value}`);
        const data = await res.json();
        setResults(data.results || []);
        setLoading(false);
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (search.length < 2) { setResults([]); return; }
        debounceRef.current = setTimeout(() => fetchResults(search), 500);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [search]);

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="flex items-center gap-2 border-4 rounded-4xl border-black px-2 py-1 shadow-[4px_4px_0px_0px_#000000]">
                <Search className="w-5 h-5" />
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (e.target.value.trim() === "" && pathname === "/search") router.back();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && search.trim() !== "") {
                            setResults([]);
                            router.push(`/search?q=${encodeURIComponent(search.trim())}`);
                            setSearch("");
                        }
                    }}
                    placeholder="search"
                    className="flex-1 md:w-40 max-sm:w-20 bg-transparent font-bold text-white outline-none"
                />
            </div>

            {search.length >= 2 && results.length > 0 && (
                <div className="absolute mt-2 w-full rounded-sm bg-black z-50">
                    {loading ? <p className="p-2 text-white/70">Loading...</p> : results.map((movie) => (
                        <div key={movie.id} onClick={() => { setSearch(""); router.push(`/titles/${movie.id}`); }} className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer">
                            <img src={movie.poster || "/no-image.png"} className="w-10 h-14 object-cover rounded-sm border" alt={movie.title} />
                            <div className="text-white"> <h5 className="font-bold">{movie.title}</h5> <p className="text-gray-400" style={{ fontSize: "1rem" }}>{movie.year}</p> </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}