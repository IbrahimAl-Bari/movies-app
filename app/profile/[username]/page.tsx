import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import FollowButton from '../ui/FollowButton'
import { Star } from "lucide-react"
import EditAvatar from "@/app/profile/ui/EditAvatar";

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

    const { data: isFollowing } = await supabase
        .from("follows")
        .select("*")
        .eq("follower_id", currentUserId)
        .eq("following_id", profile?.id)
        .maybeSingle()

    const { count: followersCount } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("following_id", profile?.id)

    const { count: followingCount } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("follower_id", profile?.id)

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", profile?.id)
        .order("created_at", { ascending: false })


    return (
        <section className="min-h-screen w-full bg-[#111111] text-white">

            {/* BANNER (IDENTITY LAYER) */}
            <div className="w-full h-40 bg-gradient-to-r from-[#FF4D4D] to-[#FFD60A] relative border-b-4 border-black">

                <div className="absolute w-full bottom-[-90px] left-6 flex items-end gap-4">

                    <EditAvatar currentUrl={profile?.avatar_url} />

                    {/* NAME + BADGE */}
                    <div className="mb-2 w-[80%] items-center flex justify-between">
                        <h1 className="text-3xl font-black flex items-center gap-2">
                            {profile?.username || 'No username yet'}
                            <span className="text-xs bg-[#FF4D4D] max-sm:hidden px-2 text-black py-1 rounded border-black shadow-[2px_2px_0px_0px_#FFD60A] border-4">
                                NEW
                            </span>
                        </h1>

                        <FollowButton
                            profileId={profile.id}
                            currentUserId={currentUserId}
                            isFollowing={!!isFollowing}
                        />

                    </div>
                </div>
            </div>


            {/* MAIN CONTENT */}
            <div className="max-w-4xl mt-20 px-6">


                {/* BIO + ACTIONS */}
                <div className=" p-5 rounded-xl">

                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">


                        <div className="grid grid-cols-4 gap-3 flex-1 text-white max-sm:flex justify-center ">
                            <div className=" w-30 p-3 max-sm:p-0  rounded-lg text-center">
                                <h5 className="max-sm:text-xs">Posts</h5>
                                <h5 className="font-black text-lg text-[#FFD60A]">{posts?.length || 0}</h5>
                            </div>

                            <div className="w-30 p-3 max-sm:p-0  rounded-lg text-center">
                                <h5 className="max-sm:text-xs">Followers</h5>
                                <h5 className="font-black text-lg text-[#FFD60A]">{followersCount || 0}</h5>
                            </div>

                            <div className="w-30 p-3 max-sm:p-0 rounded-lg text-center">
                                <h5 className="max-sm:text-xs">Following</h5>
                                <h5 className="font-black text-lg text-[#FFD60A]">{followingCount || 0}</h5>
                            </div>

                        </div>

                    </div>


                    <h4 className="text-white/80">
                        {profile?.bio || 'No bio yet — tell people your movie taste'}
                    </h4>

                </div>

                <div className="mt-10">

                    <h2 className="text-xl font-black mb-4 text-white">
                        Activity :
                    </h2>

                    <div className="space-y-4">

                        {posts?.length === 0 && (
                            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                                <p className="text-white/50">No activity yet</p>
                            </div>
                        )}

                        {posts?.map((post) => (
                            <div
                                key={post.id}
                                className="bg-[#1a1a1a] w-full md:w-[60%] border border-gray-800 rounded-xl overflow-hidden hover:border-[#FFD60A]/40 transition-all duration-200"
                            >
                                <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">

                                    <img
                                        src={post.poster || "/no-image.png"}
                                        alt="Movie poster"
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

                                        <p className="text-sm md:text-base text-white/90 leading-relaxed break-words">
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