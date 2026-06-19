"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MovieCard from "@/app/collection/components-collection/MovieCard";
import { CircleArrowLeft, CircleSlash2 } from "lucide-react";
import Loading from "@/app/loading";

type User = {
    id: string;
    username: string;
    avatar_url?: string;
    created_at?: string;
};

type Movie = {
    id: string;
    [key: string]: any;
};

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const router = useRouter();

    const [results, setResults] = useState<Movie[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query?.trim()) {
            router.back();
            return;
        }

        let isMounted = true;

        const fetchResults = async () => {
            try {
                setLoading(true);

                const encodedQuery = encodeURIComponent(query);

                const [moviesRes, usersRes] = await Promise.all([
                    fetch(`/api/search?query=${encodedQuery}`),
                    fetch(`/api/search-users?query=${encodedQuery}`)
                ]);

                const moviesData = await moviesRes.json();
                const usersData = await usersRes.json();

                if (!isMounted) return;

                setResults(moviesData.results || []);
                setUsers(usersData.results || []);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchResults();

        return () => {
            isMounted = false;
        };
    }, [query, router]);

    if (!query?.trim()) return null;

    return (
        <section className="mt-8">
            {loading ? (
                <Loading />
            ) : results.length === 0 && users.length === 0 ? (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-white text-center px-4">
                    <CircleSlash2 className="w-20 h-20 text-red-200 mb-6" />
                    <h3 className="text-lg sm:text-xl">
                        No Titles Were Found Matching "{query}"
                    </h3>
                    <p className="text-white/50 mt-2">
                        try reloading or searching for another title
                    </p>
                </div>
            ) : (
                <>
                    {users.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Users :
                            </h2>

                            <div className="grid gap-3">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() =>
                                            router.push(`/profile/${user.username}`)
                                        }
                                        className="flex items-center gap-3 p-3 bg-black/30 rounded-xl cursor-pointer hover:bg-white/5"
                                    >
                                        <img
                                            src={
                                                user.avatar_url ||
                                                `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                                            }
                                            className="w-12 h-12 rounded-full"
                                            alt={user.username}
                                        />

                                        <div className={"w-full"}>
                                            <h4 className="text-white font-bold">
                                                {user.username}
                                            </h4>
                                            <div className={"flex justify-between"}>
                                                <p className="text-white/50">
                                                    User Profile
                                                </p>
                                                <p className={"text-white/50"}>{user.created_at?.split("T")[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto my-6">
                        <div className="h-4 border-[6px] border-black bg-[#FFD60A] shadow-[6px_6px_0px_0px_#000000]" />
                    </div>

                    {results.length > 0 && (
                        <div>
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Titles :
                            </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <section className="relative overflow-hidden border-b-[6px] min-h-screen w-screen z-0 border-black bg-[#111111] pb-12 px-6">
            <div className="w-full h-full">

                <div className="flex justify-between mt-5 rounded-4xl gap-2 items-center">
                    <h3
                        className="text-white font-black"
                        style={{ lineHeight: "1.2" }}
                    >
                        Search Results For "{query}" :
                    </h3>

                    <button
                        onClick={handleClick}
                        className="text-white flex justify-center items-center gap-2 cursor-pointer underline mr-5 max-sm:mr-0"
                    >
                        <CircleArrowLeft className="w-4 max-sm:w-7 h-4 my-auto" />
                        Go Back
                    </button>
                </div>

                <Suspense fallback={<Loading />}>
                    <SearchResults />
                </Suspense>
            </div>
        </section>
    );
}