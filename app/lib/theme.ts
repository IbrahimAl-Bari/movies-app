"use server"

import { createClient } from "@/app/utils/supabase/server"

export async function setTheme(userId: string, theme_id: string) {
    const supabase = await createClient()

    await supabase
        .from("profiles")
        .update({ theme_id })
        .eq("id", userId)
}