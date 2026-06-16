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
        <div className="relative flex justify-center w-full" ref={wrapperRef}>
            <div className="flex items-center w-[60%] h-10 gap-2 border-4 rounded-4xl border-black m-6 px-3 py-2 shadow-[4px_4px_0px_0px_#000000]">
                <Search className="w-5 h-5 text-white" />
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
                        }
                    }}
                    placeholder="search"
                    className="flex-1 md:w-40 max-sm:w-20 bg-transparent font-bold text-white outline-none"
                />
            </div>

            {search.length >= 2 && results.length > 0 && (
                <div className="absolute mt-2 w-screen rounded-smbg-black z-50">



                </div>
            )}
        </div>
    );
}