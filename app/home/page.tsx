import CreatePost from "@/app/components/CreatePost"
import { createClient } from "@/app/utils/supabase/server"
import Link from "next/link"
import StoriesBar from "@/app/components/StoriesBar";
import PostPlus from "@/app/components/PostPlus";

export default async function FeedPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: posts, error } = await supabase
        .from("feed_posts")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching feed:", error)
    }

    const { data: follows } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user?.id)

    const followingIds = follows?.map(f => f.following_id) || []

    const { data: followingProfiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", followingIds)

    return (
        <section className="min-h-screen w-screen bg-[#111111] text-white max-sm:py-4 py-10 px-4 md:px-8">

            <PostPlus />

            <div className="max-w-3xl flex flex-col gap-10">

                <StoriesBar following={followingProfiles || []} />

                {/* CREATE POST FORM */}

                {/* FEED LIST */}
                <div className="flex flex-col gap-6">
                    {posts?.length === 0 && (
                        <div className="border-4 border-black bg-black p-8 text-center shadow-[6px_6px_0px_0px_#FFD60A]">
                            <h3 className="text-[#FFD60A] font-black uppercase text-xl">It's quiet here...</h3>
                            <p className="font-bold text-white/70 mt-2">Be the first to drop a thought.</p>
                        </div>
                    )}

                    {posts?.map((post) => {
                        // Format the date nicely
                        const date = new Date(post.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                        })

                        return (
                            <div
                                key={post.id}
                                className="border-[3px] md:border-4 border-black bg-[#1a1a1a] shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#FFD60A] transition-all duration-200 p-4 md:p-6"
                            >
                                {/* USER INFO ROW */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/profile/${post.username}`}>
                                            <img
                                                src={post.avatar_url || "/no-avatar.png"}
                                                alt={post.username}
                                                className="w-10 h-10 border-2 border-black rounded-full object-cover bg-black"
                                            />
                                        </Link>
                                        <div className="flex flex-col">
                                            <Link href={`/profile/${post.username}`}>
                                                <h4 className="text-[#FFD60A] font-black tracking-tight hover:underline underline-offset-2">
                                                    {post.username}
                                                </h4>
                                            </Link>
                                            <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                                                {date}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* POST CONTENT */}
                                <h5 className="text-white font-bold text-sm p-1 md:text-base leading-relaxed whitespace-pre-wrap wrap-break-word">
                                    {post.content}
                                </h5>

                                {post.image_url && (
                                    <div className="border-2 border-black shadow-[4px_4px_0px_0px_#FFD60A] overflow-hidden">
                                        <img
                                            src={post.image_url}
                                            alt="Post content"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}