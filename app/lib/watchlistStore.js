import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useWatchlistStore = create(
    persist(
        (set, get) => ({
            watchlist: [],

            toggleMovie: (movie) => {
                const exists = get().watchlist.some((m) => m.id === movie.id)

                set({
                    watchlist: exists
                        ? get().watchlist.filter((m) => m.id !== movie.id)
                        : [...get().watchlist, movie],
                })
            },

            isSaved: (id) => get().watchlist.some((m) => m.id === id),
        }),
        {
            name: "watchlist",
        }
    )
)