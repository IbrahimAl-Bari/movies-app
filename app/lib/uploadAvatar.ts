"use server";

import { createClient } from "@/app/utils/supabase/server";

export async function uploadAvatar(file: File, userId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase
        .storage
        .from("avatars")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: true,
        });

    if (uploadError) {
        return { error: uploadError.message };
    }

    const { data } = supabase
        .storage
        .from("avatars")
        .getPublicUrl(fileName);

    const avatarUrl = data.publicUrl;

    const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", user.id);

    if (updateError) {
        return { error: updateError.message };
    }

    return { success: true, avatarUrl };
}