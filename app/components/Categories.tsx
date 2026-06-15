import { CategoriesClient } from "./CategoriesClient";
import type { ApiResponse, ApiTitle, GalleryItem } from "@/app/lib/types";

async function getCategoryData(): Promise<GalleryItem[]> {

  const res = await fetch(`https://api.imdbapi.dev/titles?minAggregateRating=8&sortBy=SORT_BY_USER_RATING&sortOrder=ASC`,
      { next: { revalidate: 86400 } }
  );
  if (!res.ok) return [];

  const json: ApiResponse = await res.json();
  const titles = json?.titles ?? [];

  const genres = ["Action", "Sci-Fi", "Horror", "Comedy", "Drama", "Animation"];
  const bestByGenre: Record<string, ApiTitle> = {};
  const usedImages = new Set<string>();

  for (const title of titles) {
    if (title.type !== "tvSeries") continue;
    for (const genre of title.genres ?? []) {
      if (!genres.includes(genre)) continue;
      if (bestByGenre[genre]) continue;
      const imageUrl = title.primaryImage?.url;
      if (!imageUrl || usedImages.has(imageUrl)) continue;
      bestByGenre[genre] = title;
      usedImages.add(imageUrl);
    }
  }

  return genres
      .map((genre) => {
        const t = bestByGenre[genre];
        return t?.primaryImage?.url ? { image: t.primaryImage.url, text: genre } : null;
      })
      .filter((item): item is GalleryItem => item !== null);
}

export default async function Categories() {
  const galleryItems = await getCategoryData();
  return <CategoriesClient items={galleryItems} />;
}