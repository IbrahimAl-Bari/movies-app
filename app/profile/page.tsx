import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import EditProfile from './ui/EditProfile'
import { Star } from "lucide-react"
import EditAvatar from "@/app/profile/ui/EditAvatar";
import {themes} from "@/app/lib/themes";
import ThemePicker from "@/app/profile/ui/ThemePicker";

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

    const currentUserId = user?.id

    let followersCount = 0
    let followingCount = 0
    let posts: any[] = []

    if (profile) {
        const { count: followers } = await supabase
            .from("follows")
            .select("*", { count: "exact", head: true })
            .eq("following_id", profile.id)
        followersCount = followers || 0

        const { count: following } = await supabase
            .from("follows")
            .select("*", { count: "exact", head: true })
            .eq("follower_id", profile.id)
        followingCount = following || 0

        const { data: postsData } = await supabase
            .from("posts")
            .select("*")
            .eq("user_id", profile.id)
            .not("movie_id", "is", null)
            .order("created_at", { ascending: false })
        posts = postsData || []
    }

    const theme =
        themes[profile?.theme_id as keyof typeof themes] ||
        themes.default

    return (
        <section
            className="min-h-screen pb-6 w-full text-white"
            style={{ backgroundColor: theme.bg }}
        >

            {/* BANNER (IDENTITY LAYER) */}
            <div
                className="w-full h-40 relative border-b-4 border-black"
                style={{
                    background: `linear-gradient(90deg, ${theme.bannerFrom}, ${theme.bannerTo})`
                }}
            >

                <div className="absolute w-full bottom-[-90px] left-6 flex items-end gap-4">

                    <div
                        className="rounded-full p-1"
                        style={{
                            background: `linear-gradient(
                    135deg,
                    ${theme.accent},
                    ${theme.accent2}
                )`
                        }}
                    >
                        <EditAvatar profile={profile} />
                    </div>

                    {/* NAME + BADGE */}
                    <div className="mb-2 w-[80%] items-center flex justify-between">
                        <h1
                            className="text-3xl font-black flex items-center gap-2"
                            style={{ color: theme.text }}
                        >
                            {profile?.username || 'No username yet'}

                            <span
                                className="text-xs px-2 py-1 rounded border-black shadow-[2px_2px_0px_0px_#ffffff] border-4"
                                style={{
                                    backgroundColor: theme.accent2,
                                    color: "#000",
                                    boxShadow: `2px 2px 0 0 ${theme.accent}`,
                                }}
                            >
                                NEW
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-3xl mt-25 px-6">

                {/* BIO + ACTIONS */}
                <div
                    className="p-5 rounded-xl"
                    style={{ backgroundColor: theme.surface }}>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">

                        <EditProfile profile={profile} />

                        <div
                            className="grid grid-cols-3 gap-3 flex-1 max-sm:flex justify-center"
                            style={{ color: theme.text }}>

                            <div className="w-30 p-3 max-sm:p-0 rounded-lg text-center">
                                <h5 className="max-sm:text-xs">Posts</h5>
                                <h5
                                    className="font-black text-lg"
                                    style={{ color: theme.accent }}
                                >
                                    {posts?.length || 0}
                                </h5>
                            </div>

                            <div className="w-30 p-3 max-sm:p-0 rounded-lg text-center">
                                <h5 className="max-sm:text-xs">Followers</h5>
                                <h5
                                    className="font-black text-lg"
                                    style={{ color: theme.accent }}
                                >
                                    {followersCount || 0}
                                </h5>
                            </div>

                            <div className="w-30 p-3 max-sm:p-0 rounded-lg text-center">
                                <h5 className="max-sm:text-xs">Following</h5>
                                <h5
                                    className="font-black text-lg"
                                    style={{ color: theme.accent }}
                                >
                                    {followingCount || 0}
                                </h5>
                            </div>

                        </div>

                    </div>

                    <h4 style={{ color: theme.muted }}>
                        {profile?.bio || 'No bio yet — tell people your movie taste'}
                    </h4>
                </div>

                <ThemePicker
                    userId={user.id}
                    currentTheme={profile?.theme_id || "default"}
                />

                <div className="mt-10">

                    <h2
                        className="text-xl font-black mb-4"
                        style={{ color: theme.text }}
                    >
                        Activity :
                    </h2>

                    <div className="my-5">

                        {posts?.length === 0 && (
                            <div
                                className="rounded-xl p-6 text-center"
                                style={{ backgroundColor: theme.surface }}
                            >
                                <p style={{ color: theme.muted }}>
                                    No activity yet
                                </p>
                            </div>
                        )}

                        {posts?.map((post) => (
                            <div
                                key={post.id}
                                className="w-full mt-5 md:w-[60%] rounded-xl overflow-hidden hover:border-[#FFD60A]/40 transition-all duration-200"
                                style={{
                                    backgroundColor: theme.surface
                                }}
                            >
                                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">

                                    <img
                                        src={post.poster || "/no-image.png"}
                                        alt="Movie poster"
                                        className="w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-36 object-cover rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex-1 min-w-0 flex flex-col">

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">

                                            <div
                                                className="inline-flex w-fit gap-1 items-center px-2 sm:px-3 py-1 rounded-full font-black text-xs sm:text-sm"
                                                style={{
                                                    backgroundColor: theme.accent,
                                                    color: "#000"
                                                }}
                                            >
                                                <Star className="fill-black w-3 h-3 sm:w-4 sm:h-4" />
                                                {post.rating}/10
                                            </div>

                                            <span
                                                className="text-[10px] sm:text-xs"
                                                style={{ color: theme.muted }}
                                            >
                                                {new Date(post.created_at).toDateString()}
                                            </span>

                                        </div>

                                        <p
                                            className="text-sm md:text-base leading-relaxed break-words"
                                            style={{ color: theme.text }}
                                        >
                                            {post.content}
                                        </p>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}