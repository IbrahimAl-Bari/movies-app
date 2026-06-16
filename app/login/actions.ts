'use server'

import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Missing fields' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        if (error.message.includes('Invalid login credentials')) {
            return { error: 'No account found with this email. Please sign up first.' }
        }

        if (error.message.toLowerCase().includes('email not confirmed')) {
            return { error: 'Please verify your email first.' }
        }

        return { error: 'Invalid email or password' }
    }

    redirect('/collection')
}