import axios from 'axios';


export const api = axios.create({
    baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
    paramsSerializer: params => new URLSearchParams(params as any).toString(),
});


// Хелпер запиту списку з бекенд-фільтрами + пагінація
export async function fetchCampers(params: Record<string, any>) {
// API може повертати масив або { total, items }
    const {data} = await api.get('/campers', {params});
    if (Array.isArray(data)) return {items: data, total: data.length};
    return {items: data.items ?? [], total: data.total ?? data.items?.length ?? 0};
}


export async function fetchCamperById(id: string) {
    const {data} = await api.get(`/campers/${id}`);
    return data;
}