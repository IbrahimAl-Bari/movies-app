export async function GET() {
    try {
        const res = await fetch("https://api.imdbapi.dev/titles", {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("API error:", res.status, text);
            return Response.json({ error: text }, { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);

    } catch (err) {
        console.error("Fetch failed:", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}