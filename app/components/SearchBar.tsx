"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type Movie = { id: string; title: string; year: number; poster: string; };
type User = {
    id: string
    username: string
    avatar_url?: string
}

export default function SearchBar() {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);

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

        try {
            const [moviesRes, usersRes] = await Promise.all([
                fetch(`/api/search?query=${encodeURIComponent(value)}`),
                fetch(`/api/search-users?query=${encodeURIComponent(value)}`)
            ]);

            const moviesData = await moviesRes.json();
            const usersData = await usersRes.json();

            setResults(moviesData.results || []);
            setUsers(usersData.results || []);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (search.trim().length < 2) {
            setResults([]);
            setUsers([]);
            return;
        }

        debounceRef.current = setTimeout(() => {
            fetchResults(search);
        }, 400);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search]);

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="flex items-center gap-2 border-4 rounded-4xl border-black px-2 py-1 shadow-[4px_4px_0px_0px_#000000]">
                <Search className="w-5 h-5" />
                <input
                    value={search}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setSearch(newValue);
                        if (newValue.trim().length < 2) {
                            setResults([]);
                            setUsers([]);
                        }
                        if (newValue.trim() === "" && pathname === "/search") router.back();
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

            {search.trim().length >= 2 && (results.length > 0 || users.length > 0) && (
                <div className="absolute mt-2 w-full rounded-sm bg-black z-50">

                    {/* LOADING (ONCE ONLY) */}
                    {loading ? (
                        <p className="p-2 text-white/70">Loading...</p>
                    ) : (
                        <>
                            {/* USERS SECTION */}
                            {users.length > 0 && (
                                <div>
                                    <p className="px-2 py-1 text-xs text-gray-400 uppercase">
                                        Users
                                    </p>

                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() => {
                                                setSearch("");
                                                router.push(`/profile/${user.username}`);
                                            }}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer"
                                        >
                                            <img
                                                src={
                                                    user.avatar_url ||
                                                    `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                                                }
                                                className="w-10 h-10 object-cover rounded-sm border"
                                            />

                                            <div className="text-white">
                                                <h5 className="font-bold">{user.username}</h5>
                                                <p className="text-gray-400" style={{ fontSize: "1rem" }}>
                                                    User
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* DIVIDER */}
                            {users.length > 0 && results.length > 0 && (
                                <div className="border-t border-gray-700 my-2" />
                            )}

                            {/* MOVIES SECTION */}
                            {results.length > 0 && (
                                <div>
                                    <p className="px-2 py-1 text-xs text-gray-400 uppercase">
                                        Movies
                                    </p>

                                    {results.map((movie) => (
                                        <div
                                            key={movie.id}
                                            onClick={() => {
                                                setSearch("");
                                                router.push(`/titles/${movie.id}`);
                                            }}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer"
                                        >
                                            <img
                                                src={movie.poster || "/no-image.png"}
                                                className="w-10 h-14 object-cover rounded-sm border"
                                                alt={movie.title}
                                            />

                                            <div className="text-white">
                                                <h5 className="font-bold">{movie.title}</h5>
                                                <p className="text-gray-400" style={{ fontSize: "1rem" }}>
                                                    {movie.year}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

        </div>
    );
}