import { NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        const supabase = await createClient()

        const { error } =
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
            })

        if (error) {
            return NextResponse.json({
                error: error.message,
            })
        }

        return NextResponse.json({
            success: true,
        })
    } catch (err) {
        console.error('Route crashed:', err)

        return NextResponse.json({
            error: 'An error occurred while processing your request.',
        })
    }
}