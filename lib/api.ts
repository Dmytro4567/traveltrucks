import axios, {isAxiosError} from 'axios';

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
    try {
        const {data} = await api.get("/campers", {params});
        if (Array.isArray(data)) {
            return {items: data, total: data.length} as const;
        }

        const items = Array.isArray(data?.items) ? data.items : [];
        const total =
            typeof data?.total === "number"
                ? data.total
                : items.length;

        return {items, total} as const;
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) {
            return {items: [], total: 0} as const;
        }
        throw err;
    }
}

export async function fetchCamperById(id: string) {
    const {data} = await api.get(`/campers/${id}`);
    return data;
}