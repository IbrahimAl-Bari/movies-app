"use server";

import { createClient } from "@/app/utils/supabase/server";

export async function createPost(formData: FormData): Promise<void> {
    const supabase = await createClient();

    const movie_id = formData.get("movie_id") as string;
    const poster = (formData.get("poster") as string) || "/no-image.png";
    const content = (formData.get("content") as string || "").trim();
    const rating = Number(formData.get("rating"));

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
        throw new Error("Not logged in");
    }

    if (!movie_id || !content || !rating) {
        throw new Error("Missing fields");
    }

    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }

    const { data: user } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", userData.user.id)
        .single();

    const { data: avatar } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", userData.user.id)
        .single();

    const username = user?.username || "Unknown";

    const avatar_url =
        avatar?.avatar_url ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=1f2937,111827,0f172a,000000&textColor=FFD60A`;

    const { error } = await supabase.from("posts").insert({
        user_id: userData.user.id,
        movie_id,
        content,
        rating,
        poster,
        username,
        avatar_url,
    });

    if (error) {
        throw new Error(error.message);
    }
}