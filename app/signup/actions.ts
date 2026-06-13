'use server'

import {createClient} from "@supabase/supabase-js";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function signup(formData: FormData) {
    // @ts-ignore
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string


    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username,
            },
        },
    })

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}