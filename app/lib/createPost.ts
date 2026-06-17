"use server";

import { createClient } from "@/app/utils/supabase/server";

export async function createPost(formData: FormData) {
    const supabase = await createClient();

    const movie_id = formData.get("movie_id") as string;
    const poster = (formData.get("poster") as string) || "/no-image.png";
    const content = formData.get("content") as string;
    const rating = Number(formData.get("rating"));

    const { data: user } = await supabase.auth.getUser();

    if (!user.user) return { error: "Not logged in" };

    if (!movie_id || !content || !rating) {
        return { error: "Missing fields" };
    }

    const { error } = await supabase.from("posts").insert({
        user_id: user.user.id,
        movie_id,
        content,
        rating,
        poster
    });

    if (error) {
        return { error: error.message };
    }
}