import {notFound} from "next/navigation";
import {Star, Calendar, Globe, Clock, TrendingUp, Users, TvMinimal} from "lucide-react";
import React from "react";
import BookmarkComp from "@/app/titles/BookmarkComp";
import GoBack from "@/app/titles/GoBack";
import AddReview from "@/app/components/AddReview";
import {createClient} from "@/app/utils/supabase/server";
import Link from "next/link";
import WatchLink from "@/app/components/WatchLink";

type PageProps = {
    params: Promise<{ mediaType: string; id: string }>;
};

const TMDB_BASE = "https://api.themoviedb.org/3";

/* ------------------------- HELPERS ------------------------- */

async function fetchTMDB(path: string, cacheSeconds = 86400) {
    const apiKey = process.env.TMDB_KEY;
    if (!apiKey) throw new Error("Missing TMDB_KEY");

    const url = new URL(`${TMDB_BASE}${path}`);
    url.searchParams.set("api_key", apiKey);

    const res = await fetch(url.toString(), {
        next: { revalidate: cacheSeconds }
    });

    if (!res.ok) return null;
    return res.json();
}

async function getTmdbFromImdb(imdbId: string) {
    const data = await fetchTMDB(`/find/${imdbId}?external_source=imdb_id`);

    if (data?.movie_results?.length > 0) {
        return { id: data.movie_results[0].id, type: "movie" };
    }

    if (data?.tv_results?.length > 0) {
        return { id: data.tv_results[0].id, type: "tv" };
    }

    return null;
}

async function getMedia(id: string | number, type: string) {
    return await fetchTMDB(`/${type}/${id}`);
}

/* ------------------------- FORMATTERS ------------------------- */

function formatRuntime(minutes: number) {
    if (!minutes) return "—";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}H ${m}M`;
}

function formatMoney(num: number) {
    if (!num) return "—";
    const abs = Math.abs(num);

    const units = [
        { value: 1e12, symbol: "T" },
        { value: 1e9,  symbol: "B" },
        { value: 1e6,  symbol: "M" },
        { value: 1e3,  symbol: "K" }
    ];

    for (const unit of units) {
        if (abs >= unit.value) {
            return (num / unit.value).toFixed(1).replace(/\.0$/, "") + unit.symbol + " $";
        }
    }

    return num + " $";
}

/* ------------------------- PAGE ------------------------- */

export default async function MediaPage({ params }: PageProps) {
    const { id, mediaType } = await params;

    if (!id) notFound();

    let tmdbId: string | number = id;
    let actualType: string = mediaType || "movie";

    if (id.startsWith("tt")) {
        const resolved = await getTmdbFromImdb(id);
        if (!resolved) notFound();
        tmdbId = resolved.id;
        actualType = resolved.type;
    }

    const media = await getMedia(tmdbId, actualType);
    if (!media) notFound();

    const displayTitle = media.title || media.name;
    const displayDate = media.release_date || media.first_air_date;
    const runtime = media.runtime || (media.episode_run_time && media.episode_run_time[0]) || 0;

    const poster = media.poster_path
        ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
        : "/no-image.png";

    const vote = media.vote_average ? media.vote_average : null
    const rating = media.averageRating ? media.averageRating : null

    const supabase = await createClient()

    const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("movie_id", media.id)
        .order("created_at", { ascending: false })

    if (postsError) {
        console.error("Error fetching posts:", postsError)
    }

    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;


    return (
        <section className="min-h-screen w-screen bg-[#111111] text-white">

            <div className="w-full h-full  mx-auto px-4 md:px-8 py-10">

                <div className="flex flex-col md:flex-row gap-10 items-start">

                    <div className="w-full md:w-1/2">

                        {media.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {media.genres.map((g: any) => (
                                    <span
                                        key={g.id}
                                        className="border-4 border-black px-3 py-1 font-black uppercase text-xs bg-black text-white shadow-[4px_4px_0px_0px_#FFD60A]">
                                        {g.name}
                                    </span>
                                ))}
                                <span> <GoBack /> </span>
                            </div>
                        )}

                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                            {displayTitle}
                        </h1>

                        <div className="flex flex-wrap gap-4 mt-6 text-sm font-black">

                            <div className="flex items-center gap-2 border-4 border-black px-3 py-2 bg-[#FFD60A] text-black shadow-[4px_4px_0px_0px_#000]">
                                <Star className="w-4 h-4" />
                                {media.vote_average?.toFixed(1)} ({media.vote_count})
                            </div>

                            <div className="flex items-center gap-2 border-4 border-black px-3 py-2 bg-white text-black shadow-[4px_4px_0px_0px_#000]">
                                <Calendar className="w-4 h-4" />
                                {displayDate}
                            </div>

                            <div className="flex items-center gap-2 border-4 border-black px-3 py-2 bg-[#FF4D4D] text-black shadow-[4px_4px_0px_0px_#000]">
                                <Globe className="w-4 h-4" />
                                {media.original_language?.toUpperCase()}
                            </div>

                            {mediaType === "tv" ? null : <div className="flex items-center gap-2 border-4 border-black px-3 py-2 bg-black text-white shadow-[4px_4px_0px_0px_#FFD60A]">
                                <Clock className="w-4 h-4" />
                                {formatRuntime(runtime)}
                            </div>}

                        </div>

                        <p className="text-white/70 mt-4 w-full font-bold leading-relaxed">
                            {media.overview}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4 text-sm font-black">

                            <div className="flex items-center gap-2 border-4 border-black px-3 py-2 bg-black text-white shadow-[4px_4px_0px_0px_#000]">
                                <TvMinimal className="w-4 h-4 text-[#FFD60A]" />
                                {mediaType === "movie" ? `Budget: ${formatMoney(media.budget)}` : `Seasons : ${media.number_of_seasons}`}
                            </div>

                            <div className="flex items-center gap-2 border-4 border-black px-3 py-2 bg-black text-white shadow-[4px_4px_0px_0px_#000]">
                                <TrendingUp className="w-4 h-4 text-[#FF4D4D]" />
                                {mediaType === "movie" ? `Revenue: ${formatMoney(media.revenue)}` : `Episodes : ${media.number_of_episodes}`}
                            </div>

                            <div className="flex items-center gap-2 border-4 border-black px-3 py-2 bg-black text-white shadow-[4px_4px_0px_0px_#000]">
                                <Users className="w-4 h-4 text-white" />
                                Popularity: {media.popularity?.toFixed(1)}
                            </div>

                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex-col justify-center">

                        <div className="relative border-4 w-66 mx-auto border-black shadow-[8px_8px_0px_0px_#000] rounded-2xl bg-black overflow-hidden max-w-100">

                            <img
                                src={poster}
                                alt={displayTitle}
                                className="w-full h-96 object-cover"
                            />

                            <BookmarkComp movie={media}/>

                            <div className="absolute top-2 right-2 border-2 flex items-center gap-1 border-black bg-[#FFD60A] px-1.5 py-0.5 text-xs font-black text-black shadow-[3px_3px_0px_0px_#000]">
                                <Star className="w-3 h-3 fill-black" />
                                {rating?.toFixed(1) ?? vote?.toFixed(1) ?? "N/A"}
                            </div>

                        </div>

                        {media.tagline && (
                            <h4 className="text-center mt-5 uppercase text-[1rem] text-[#FF4D4D] font-black italic">
                                "{media.tagline}"
                            </h4>
                        )}

                        <WatchLink media={media} type={actualType} title={displayTitle} />
                    </div>

                </div>

                <h3 className={"pt-10 pb-3"}>Reviews :
                    <br/>
                    <p>add your own review</p>
                </h3>
                {userId && <AddReview movieId={media.id} poster={poster} />}


                <div className="space-y-4 mt-10">

                    {posts?.length === 0 && (
                        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                            <p className="text-white/50">No activity yet</p>
                        </div>
                    )}

                    {posts?.map((post) => {
                        return (
                            <div
                                key={post.id}
                                className="bg-[#1a1a1a] w-full md:w-[60%] border border-gray-800 rounded-xl overflow-hidden hover:border-[#FFD60A]/40 transition-all duration-200"
                            >
                                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">

                                    <img
                                        src={post.poster || "/no-image.png"}
                                        alt="Poster"
                                        className="w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-36 object-cover rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex-1 min-w-0 flex flex-col">

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">

                                            <div className="inline-flex w-fit gap-1 items-center px-2 sm:px-3 py-1 rounded-full bg-[#FFD60A] text-black font-black text-xs sm:text-sm">
                                                <Star className="fill-black w-3 h-3 sm:w-4 sm:h-4" />
                                                {post.rating}/10
                                            </div>

                                            <span className="text-[10px] sm:text-xs text-gray-500">
                                            {new Date(post.created_at).toDateString()}
                                        </span>

                                        </div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <Link href={`/profile/${post.username}`}>
                                                <img
                                                    src={post.avatar_url || "/no-avatar.png"}
                                                    className="w-6 h-6 rounded-full border border-[#FFD60A]"
                                                    alt="Avatar"
                                                />
                                            </Link>

                                            <h4 className="text-xs text-[#FFD60A] font-bold">
                                                {post.username || 'Unknown user'}
                                            </h4>

                                        </div>

                                        <p className="text-sm md:text-base text-white/90 leading-relaxed break-words">
                                            {post.content}
                                        </p>

                                    </div>

                                </div>
                            </div>
                        ) })}

                </div>

            </div>

        </section>
    );
}