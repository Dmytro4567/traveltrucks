export interface Review {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export interface GalleryItem {
    thumb: string;
    original: string;
}

export interface Camper {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: 'alcove' | 'panelTruck' | 'fullyIntegrated';
    length?: string;
    width?: string;
    height?: string;
    tank?: string;
    consumption?: string;

    transmission?: 'automatic' | 'manual';
    engine?: 'diesel' | 'petrol' | 'hybrid';

    AC?: boolean;
    bathroom?: boolean;
    kitchen?: boolean;
    TV?: boolean;
    radio?: boolean;
    refrigerator?: boolean;
    microwave?: boolean;
    gas?: boolean;
    water?: boolean;

    gallery?: GalleryItem[];
    reviews?: Review[];
}


export type BodyType = 'alcove' | 'panelTruck' | 'fullyIntegrated' | '';


export interface FiltersState {
    location: string;
    form: BodyType;
    features: {
        AC: boolean;
        kitchen: boolean;
        bathroom: boolean;
        TV: boolean;
        automatic: boolean;
    };
}

export type QueryParams = Record<string, string | number | boolean | undefined>;



export function filtersToQuery(f: FiltersState): QueryParams {
    const q: QueryParams = {};
    if (f.location) q.location = f.location;
    if (f.form) q.form = f.form;

    const {AC, kitchen, bathroom, TV, automatic} = f.features;
    if (AC) q.AC = true;
    if (kitchen) q.kitchen = true;
    if (bathroom) q.bathroom = true;
    if (TV) q.TV = true;
    if (automatic) q.transmission = 'automatic';

    return q;
}