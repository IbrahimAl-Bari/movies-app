import { rateLimit } from "@/app/lib/rate-limit";

const cache = new Map<
    string,
    {
        data: any;
        expires: number;
    }
>();

const CACHE_TIME = 60 * 60 * 1000; // 1 hour

export async function GET(req: Request) {
    const ip =
        req.headers.get("x-forwarded-for") ||
        "unknown";

    if (!rateLimit(ip, 50, 60000)) {
        return Response.json(
            { error: "Too many requests" },
            { status: 429 }
        );
    }

    const cacheKey = "imdb-titles";

    const cached = cache.get(cacheKey);

    if (cached && cached.expires > Date.now()) {
        return Response.json(cached.data);
    }

    try {
        const res = await fetch(
            "https://api.imdbapi.dev/titles",
            {
                next: { revalidate: 3600 }
            }
        );

        if (!res.ok) {
            const text = await res.text();

            return Response.json(
                { error: text },
                { status: res.status }
            );
        }

        const data = await res.json();

        cache.set(cacheKey, {
            data,
            expires: Date.now() + CACHE_TIME,
        });

        return Response.json(data);

    } catch {
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}