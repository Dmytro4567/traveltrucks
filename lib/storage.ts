const KEY = 'tt_favorites_v1';
export const loadFav = (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
        return [];
    }
};
export const saveFav = (ids: string[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(ids));
};