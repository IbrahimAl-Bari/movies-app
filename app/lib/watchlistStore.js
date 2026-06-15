import { create } from "zustand"

export const useWatchlistStore = create((set, get) => ({
    watchlist: [],

    // add or remove movie
    toggleMovie: (movie) => {
        const exists = get().watchlist.some((m) => m.id === movie.id)

        let updated

        if (exists) {
            updated = get().watchlist.filter((m) => m.id !== movie.id)
        } else {
            updated = [...get().watchlist, movie]
        }

        set({ watchlist: updated })

        // optional persistence
        localStorage.setItem("watchlist", JSON.stringify(updated))
    },

    // check if saved
    isSaved: (id) => {
        return get().watchlist.some((m) => m.id === id)
    },

    // load from localStorage on app start
    hydrate: () => {
        const data = localStorage.getItem("watchlist")
        if (data) {
            set({ watchlist: JSON.parse(data) })
        }
    },
}))