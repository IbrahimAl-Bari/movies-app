import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabaseConfig } from './app/utils/supabase/config'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })
    const { url, anonKey } = getSupabaseConfig()

    const supabase = createServerClient(
        url,
        anonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Do NOT use supabase.auth.getSession() here.
    // getUser() validates the token against the Supabase server.
    const { data: { user } } = await supabase.auth.getUser()

    // Example Route Protection: Protect the /collection route
    if (!user && request.nextUrl.pathname.startsWith('/collection')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}