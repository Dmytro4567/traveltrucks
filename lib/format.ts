export const priceToUi = (n: number) => `${n.toFixed(2)}`; // 8000 → 8000.00


export const splitLocation = (s: string) => {
    const [country, city] = s.split(',').map(p => p.trim());
    return { country, city };
};