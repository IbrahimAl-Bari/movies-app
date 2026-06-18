"use server"

import { createClient } from '@/app/utils/supabase/server'
import {revalidatePath} from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const username = formData.get('username') as string
    const bio = formData.get('bio') as string
    const avatar_url = formData.get('avatar_url') as string

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const updateData: { id: string; username: string; bio: string; avatar_url?: string } = {
        id: user.id,
        username,
        bio,
    }

    if (avatar_url) {
        updateData.avatar_url = avatar_url
    }

    const { error } = await supabase
        .from('profiles')
        .upsert(updateData)

    if (error) {
        return { error: error.message }
    }

    return { success: "Profile updated successfully!" };

}