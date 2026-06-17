"use server"

import { createClient } from '@/app/utils/supabase/server'

export async function signup(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string
    const terms = formData.get('terms') as string

    if (!username?.trim()) return { error: 'Username is required.' }
    if (!email) return { error: 'Email address is required.' }
    if (!password) return { error: 'Password is required.' }

    if (!terms || terms !== 'on') {
        return { error: 'You must accept the Terms of Service to continue.' }
    }

    const cleanUsername = username.trim()

    if (cleanUsername.length < 3) {
        return { error: 'Username must be at least 3 characters long.' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { error: 'Please enter a valid email address.' }
    }

    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters long.' }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: cleanUsername,
            },
        },
    })

    if (error) {
        const msg = error.message

        if (msg.includes('user already registered') || error.status === 422) {
            return { error: 'An account already exists with this email. Please log in instead.' }
        }

        return { error: 'Signup failed: ' + error.message }
    }

    if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
        return { error: 'An account already exists with this email. Please log in instead.' }
    }

    if (data.user && !data.session) {
        return {
            success: 'Account created! Check your email for the verification link, then log in.'
        }
    }

    return {
        success: 'Account created successfully. Please verify your email to continue.',
    }
}