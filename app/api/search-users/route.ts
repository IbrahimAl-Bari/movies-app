import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    const supabase = await createClient();

    const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, created_at")
        .ilike("username", `%${query}%`)
        .limit(3);

    return NextResponse.json({ results: data || [] });
}