'use client';

import styles from './Filters.module.css';
import {useCampersStore} from '@/store/useCampersStore';
import type {BodyType, FiltersState} from '@/lib/types';
import Button from "@/app/components/ui/Button/Button";

const BODY_FORMS = ['panelTruck', 'fullyIntegrated', 'alcove'] as const;
type FormKey = typeof BODY_FORMS[number];

const FORM_LABEL: Record<FormKey, string> = {
    alcove: 'Alcove',
    panelTruck: 'Van',
    fullyIntegrated: 'Fully Integrated',
};

function Tile({
                  id,
                  label,
                  active,
                  onClick,
              }: {
    id: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            className={active ? `${styles.tile} ${styles.tileActive}` : styles.tile}
            onClick={onClick}
            aria-pressed={active}
        >
            <svg className={styles.icon} aria-hidden="true">
                <use href={`/sprite.svg#${id}`}/>
            </svg>
            <span>{label}</span>
        </button>
    );
}

export default function Filters() {
    const {filters, setFilters, resetAndFetch} = useCampersStore();

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        void setFilters((prev) => ({...prev, [name]: value} as FiltersState));
    };

    const onSelectForm = (form: BodyType) =>
        void setFilters((p) => ({...p, form}));

    const onToggleFeat = (key: keyof FiltersState['features']) =>
        void setFilters((p) => ({
            ...p,
            features: {...p.features, [key]: !p.features[key]},
        }));

    const iconForForm = (form: FormKey) =>
        form === 'panelTruck'
            ? 'icon-bi_grid-3x3-gap'
            : form === 'fullyIntegrated'
                ? 'icon-bi_grid'
                : 'icon-bi_grid-1x2';

    return (
        <aside className={styles.wrapper} aria-labelledby="filtersTitle">
            <div className={styles.group}>
                <div className={styles.label}>Location</div>
                <div className={styles.inputWrap}>
                    <svg className={styles.inputIcon} aria-hidden="true">
                        <use href="/sprite.svg#icon-bi_grid-1x2"/>
                    </svg>
                    <input
                        name="location"
                        value={filters.location}
                        onChange={onChangeInput}
                        placeholder="Kyiv, Ukraine"
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.title} id="filtersTitle">Filters</div>
            <div className={styles.group}>
                <div className={styles.subTitle}>Vehicle equipment</div>
                <div className={styles.tiles}>
                    <Tile
                        id="icon-wind"
                        label="AC"
                        active={filters.features.AC}
                        onClick={() => onToggleFeat('AC')}
                    />
                    <Tile
                        id="icon-cup-hot"
                        label="Kitchen"
                        active={filters.features.kitchen}
                        onClick={() => onToggleFeat('kitchen')}
                    />
                    <Tile
                        id="icon-tv"
                        label="TV"
                        active={filters.features.TV}
                        onClick={() => onToggleFeat('TV')}
                    />
                    <Tile
                        id="icon-ph_shower"
                        label="Bathroom"
                        active={filters.features.bathroom}
                        onClick={() => onToggleFeat('bathroom')}
                    />
                    <Tile
                        id="icon-diagram" // transmission === 'automatic'
                        label="Automatic"
                        active={filters.features.automatic}
                        onClick={() => onToggleFeat('automatic')}
                    />
                </div>
            </div>

            <div className={styles.group}>
                <div className={styles.subTitle}>Vehicle type</div>
                <div className={styles.tiles}>
                    {BODY_FORMS.map((form) => (
                        <Tile
                            key={form}
                            id={iconForForm(form)}
                            label={FORM_LABEL[form]}
                            active={filters.form === form}
                            onClick={() => onSelectForm(form)}
                        />
                    ))}
                    <Tile
                        id="icon-bi_grid-1x2"
                        label="Any"
                        active={filters.form === ''}
                        onClick={() => onSelectForm('')}
                    />
                </div>
            </div>

            <Button variant="primary" onClick={() => resetAndFetch()}>
                Search
            </Button>
        </aside>
    );
}
