
type PageProps = {
    params: Promise<{ id: string }>
}

const TMDB_BASE = "https://api.themoviedb.org/3"

async function getTmdbFromImdb(imdbId: string): Promise<number | null> {
    const apiKey = process.env.TMDB_KEY
    if (!apiKey) throw new Error("Missing Api Key")

    const res = await fetch(
        `${TMDB_BASE}/find/${imdbId}?api_key=${apiKey}&external_source=imdb_id`,
        { cache: "force-cache" }
    )

    if (!res.ok) return null

    const data = await res.json()
    return data?.movie_results?.[0]?.id || null
}

async function getMovieByTmdbId(tmdbId: string | number) {
    const apiKey = process.env.TMDB_KEY
    if (!apiKey) throw new Error("Missing TMDB_KEY in .env.local")

    const res = await fetch(
        `${TMDB_BASE}/movie/${tmdbId}?api_key=${apiKey}`,
        { next: { revalidate: 86400 } }
    )

    if (!res.ok) return null

    return res.json()
}

export default async function MoviePage({ params }: PageProps) {

    const resolvedParams = await params
    const id = resolvedParams.id

    if (!id) {
        return <div>Invalid movie ID</div>
    }

    let tmdbId: string | number = id

    if (id.startsWith("tt")) {
        const resolved = await getTmdbFromImdb(id)

        if (!resolved) {
            return <div>Movie not found in TMDB</div>
        }

        tmdbId = resolved
    }

    const movie = await getMovieByTmdbId(tmdbId)

    if (!movie) {
        return <div>Movie data not found</div>
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
        </div>
    )
}