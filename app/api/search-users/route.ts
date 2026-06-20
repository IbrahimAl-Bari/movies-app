import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";
import { rateLimit } from "@/app/lib/rate-limit";

const cache = new Map<
    string,
    {
        data: any[];
        expires: number;
    }
>();

const CACHE_TIME = 60 * 1000;

export async function GET(req: Request) {
    const ip =
        req.headers.get("x-forwarded-for") ||
        "unknown";

    if (!rateLimit(ip, 30, 60000)) {
        return NextResponse.json(
            { error: "Too many requests" },
            { status: 429 }
        );
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (query.length < 2) {
        return NextResponse.json({
            results: [],
        });
    }

    const cached = cache.get(query);

    if (cached && cached.expires > Date.now()) {
        return NextResponse.json({
            results: cached.data,
        });
    }

    const supabase = await createClient();

    const { data } = await supabase
        .from("profiles")
        .select(
            "id, username, avatar_url, created_at"
        )
        .ilike("username", `%${query}%`)
        .limit(3);

    cache.set(query, {
        data: data || [],
        expires: Date.now() + CACHE_TIME,
    });

    return NextResponse.json({
        results: data || [],
    });
}