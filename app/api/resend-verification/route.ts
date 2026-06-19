import { NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        const supabase = await createClient()

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
        })

        if (error) {
            console.error('Supabase resend error:', error)

            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: 'Verification email sent successfully.',
        })
    } catch (err) {
        console.error('Route error:', err)

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}