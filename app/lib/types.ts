export type ApiRating =
    | { aggregateRating?: number; voteCount?: number }
    | number
    | string;

export interface ApiTitle {
    id?: string | number;
    type?: string;
    genres?: string[];
    primaryImage?: {
        url?: string;
    };
    rating?: ApiRating;
    originalTitle?: string;
    startYear?: string | number;
}

export interface ApiResponse {
    titles?: ApiTitle[];
}

export interface TitleItem {
    id: string | number;
    type: string;
    primaryImage: string;
    rating: number;
    originalTitle: string;
    startYear: string;
}

export interface GalleryItem {
    image: string;
    text: string;
}