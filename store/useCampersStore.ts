// store/useCampersStore.ts
'use client';

import { create } from 'zustand';
import { Camper, FiltersState, filtersToQuery } from '@/lib/types';
import { fetchCampers, type QueryParams } from '@/lib/api';
import { loadFav, saveFav } from '@/lib/storage';

const defaultFilters: FiltersState = {
    location: '',
    form: '',
    features: {
        AC: false,
        kitchen: false,
        bathroom: false,
        TV: false,
        automatic: false, // transmission === 'automatic'
    },
};

type State = {
    items: Camper[];
    total: number;
    page: number;
    limit: number;
    isLoading: boolean;
    error: string | null;
    filters: FiltersState;
    favorites: string[];
};

type Actions = {
    setFilters: (updater: (prev: FiltersState) => FiltersState) => Promise<void>;
    resetAndFetch: () => Promise<void>;
    loadMore: () => Promise<void>;
    toggleFavorite: (id: string) => void;
    hydrateFavorites: () => void;
};

export const useCampersStore = create<State & Actions>((set, get) => ({
    items: [],
    total: 0,
    page: 1,
    limit: 8,
    isLoading: false,
    error: null,
    filters: defaultFilters,
    favorites: [],

    async setFilters(updater) {
        const next = updater(get().filters);
        set({ filters: next, page: 1, items: [], total: 0 });
        await get().resetAndFetch();
    },

    async resetAndFetch() {
        const { filters, limit } = get();
        set({ isLoading: true, error: null, page: 1, items: [] });
        try {
            const params: QueryParams = {
                page: 1,
                limit,
                ...filtersToQuery(filters), // ← собираем корректные параметры
            };

            const { items, total } = await fetchCampers(params);
            set({ items, total, isLoading: false });
        } catch (e: unknown) {
            set({ isLoading: false, error: e instanceof Error ? e.message : 'Error' });
        }
    },

    async loadMore() {
        const { page, limit, filters, items } = get();
        set({ isLoading: true, error: null });
        try {
            const params: QueryParams = {
                page: page + 1,
                limit,
                ...filtersToQuery(filters), // ← те же фильтры
            };

            const { items: more } = await fetchCampers(params);
            set({ items: [...items, ...more], page: page + 1, isLoading: false });
        } catch (e: unknown) {
            set({ isLoading: false, error: e instanceof Error ? e.message : 'Error' });
        }
    },

    toggleFavorite(id) {
        const fav = new Set(get().favorites);
        fav.has(id) ? fav.delete(id) : fav.add(id);
        const arr = Array.from(fav);
        saveFav(arr);
        set({ favorites: arr });
    },

    hydrateFavorites() {
        set({ favorites: loadFav() });
    },
}));
