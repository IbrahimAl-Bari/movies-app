"use server"

import { createClient } from "@/app/utils/supabase/server"

export async function setTheme(userId: string, theme_id: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Not authenticated")
    }

    const { error } = await supabase
        .from("profiles")
        .update({ theme_id })
        .eq("id", user.id)

    if (error) {
        throw new Error(error.message)
    }
}