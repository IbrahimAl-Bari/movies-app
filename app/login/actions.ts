'use server'

import { createClient } from '@/app/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {

    const supabase = await createClient()

    const email = formData.get('email')
    const password = formData.get('password')
    const terms = formData.get('terms')

    const errors: any = {}

    if (!email) errors.email = true
    if (!password) errors.password = true
    if (!terms) return { error: 'You must accept the Terms & Conditions' }

    if (Object.keys(errors).length > 0) {
        return { fieldErrors: errors }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: email as string,
        password: password as string,
    })

    if (error) {
        return { error: 'Wrong email or password' }
    }

    revalidatePath('/', 'layout')
    redirect('/collection')
}