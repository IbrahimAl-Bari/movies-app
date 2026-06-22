"use server"

import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'


export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const terms = formData.get('terms') as string

    if (!email) return { error: 'Email address is required.' }
    if (!password) return { error: 'Password is required.' }

    if (!terms || terms !== 'on') {
        return { error: 'You must accept the Terms of Service to continue.' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { error: 'Please enter a valid email address.' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        const message = error.message

        if (message.includes('email not confirmed')) {
            return {
                error: 'Please verify your email first. Check your inbox and click the verification link before logging in.'
                ,needsVerification: true
            }
        }

        if (message.includes('invalid login credentials')) {
            return { error: 'Incorrect email or password. Please try again.' }
        }

        return { error: error.message }
    }

    // 6. Success Flow
    redirect('/home')
}