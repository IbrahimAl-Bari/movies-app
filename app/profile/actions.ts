"use server";

import { createClient } from "@/app/utils/supabase/server";

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    const now = new Date();

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("last_profile_update")
        .eq("id", user.id)
        .single();

    if (profileError) {
        return { error: profileError.message };
    }

    if (profile?.last_profile_update) {
        const lastUpdate = new Date(profile.last_profile_update);

        const oneDay = 24 * 60 * 60 * 1000;

        if (now.getTime() - lastUpdate.getTime() < oneDay) {
            return {
                error: "You can only edit your profile once every day."
            };
        }
    }

    const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username,
        bio,
        last_profile_update: now.toISOString()
    });

    if (error) {
        return { error: error.message };
    }

    return { success: "Profile updated successfully!" };
}