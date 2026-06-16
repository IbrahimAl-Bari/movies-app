'use server'

import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    if (!email || !password || !username) {
        return { error: 'Missing fields' }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username },
        },
    })

    if (error) {
        if (error.message.includes('User already registered')) {
            return { error: 'You already have an account. Please log in.' }
        }

        return { error: error.message }
    }

    if (data.user && !data.session) {
        return {
            error: 'Check your email to verify your account before logging in.',
        }
    }

    if (data.session) {
        redirect('/collection')
    }

    return {
        error: 'Signup successful. Please check your email to verify your account.',
    }
}