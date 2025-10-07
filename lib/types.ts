export type CamperFeatureKey =
    | 'transmission' | 'engine' | 'AC' | 'bathroom' | 'kitchen' | 'TV' | 'radio'
    | 'refrigerator' | 'microwave' | 'gas' | 'water';


export type CamperDetailsKey =
    | 'form' | 'length' | 'width' | 'height' | 'tank' | 'consumption';


export interface Review {
    reviewer_name: string;
    reviewer_rating: number; // 1..5
    comment: string;
}


export interface GalleryItem {
    thumb: string;
    original: string
}


export interface Camper {
    id: string;
    name: string;
    price: number; // 8000 → UI: 8000.00
    rating: number; // 4.5
    location: string; // "Ukraine, Kyiv"
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


export interface ApiListResponse<T> {
    total?: number;
    items?: T[]
}


export type BodyType = 'alcove' | 'panelTruck' | 'fullyIntegrated' | '';


export interface FiltersState {
    location: string; // текст
    form: BodyType; // один
    features: {
        AC: boolean; kitchen: boolean; bathroom: boolean; TV: boolean; radio: boolean;
        refrigerator: boolean; microwave: boolean; gas: boolean; water: boolean;
    };
}