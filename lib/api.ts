import axios from 'axios';

export type QueryParams = Record<string, string | number | boolean | undefined>;

export const api = axios.create({
    baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
    paramsSerializer: (params: QueryParams) => {
        const usp = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined) usp.set(k, String(v));
        });
        return usp.toString();
    },
});

export async function fetchCampers(params: QueryParams) {
    const {data} = await api.get('/campers', {params});
    if (Array.isArray(data)) return {items: data, total: data.length} as const;
    return {items: data.items ?? [], total: data.total ?? data.items?.length ?? 0} as const;
}

export async function fetchCamperById(id: string) {
    const {data} = await api.get(`/campers/${id}`);
    return data;
}