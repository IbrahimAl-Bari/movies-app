"use server"

import { createClient } from "@/app/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function createFeedPost(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "You must be logged in to post." }
    }

    const content = formData.get("content") as string
    const imageFile = formData.get("image") as File | null
    let image_url = null

    const entries = Array.from(formData.entries());
    console.log("FORM DATA ENTRIES:", entries);

    console.log("IMAGE FILE RECEIVED:", imageFile);

    // 1. Handle Image Upload
    if (imageFile && imageFile.size > 0 && imageFile.type.startsWith("image/")) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('posts') // Ensure this bucket exists and is public
            .upload(fileName, imageFile)

        if (!uploadError) {
            const { data } = supabase.storage.from('posts').getPublicUrl(fileName)
            image_url = data.publicUrl
        }
    }

    if (!content || content.trim() === "") {
        return { error: "Post cannot be empty." }
    }

    const { data: avatar } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

    const username = user.user_metadata?.username || user.user_metadata?.full_name || "Anonymous User"
    const avatar_url =
        avatar?.avatar_url ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=1f2937,111827,0f172a,000000&textColor=FFD60A`;

    // 2. Insert into database with the image_url
    const { error } = await supabase
        .from("feed_posts")
        .insert({
            user_id: user.id,
            username: username,
            avatar_url: avatar_url,
            content: content,
            image_url: image_url // Now this will contain the public URL string
        })

    if (error) {
        console.error("Insert error:", error)
        return { error: "Failed to post. Try again." }
    }

    revalidatePath("/home")
    return { success: true }
}