'use server'

import { createClient } from '@/app/utils/supabase/server'

export async function resendVerification(
    email: string
) {
    const supabase = await createClient()

    const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
    })

    if (error) {
        return {
            error: error.message,
        }
    }

    return {
        success:
            'Verification email sent successfully.',
    }
}