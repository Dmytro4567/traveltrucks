'use client';
import styles from './Filters.module.css';
import {useCampersStore} from '@/store/useCampersStore';
import type {BodyType, FiltersState} from '@/lib/types';

export default function Filters() {
    const {filters, setFilters, resetAndFetch} = useCampersStore();

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        void setFilters((prev) => ({...prev, [name]: value} as FiltersState));
    };

    const onSelectForm = (form: BodyType) => {
        void setFilters((p) => ({...p, form}));
    };

    const onToggleFeat = (key: keyof FiltersState['features']) => {
        void setFilters((p) => ({...p, features: {...p.features, [key]: !p.features[key]}}));
    };


    return (
        <aside className={styles.wrapper}>
            <div className={styles.box}>
                <label>Location</label>
                <input name="location" value={filters.location} placeholder="Ukraine, Kyiv" onChange={onChangeInput}/>
            </div>


            <div className={styles.box}>
                <div className={styles.subTitle}>Vehicle type</div>
                <div className={styles.pills}>
                    {['alcove', 'panelTruck', 'fullyIntegrated'].map((f) => (
                        <button key={f} className={filters.form === f ? styles.pillActive : styles.pill}
                                onClick={() => onSelectForm(f as any)}>{f}</button>
                    ))}
                    <button className={!filters.form ? styles.pillActive : styles.pill}
                            onClick={() => onSelectForm('' as any)}>any
                    </button>
                </div>
            </div>


            <div className={styles.box}>
                <div className={styles.subTitle}>Vehicle equipment</div>
                <div className={styles.grid}>
                    {(['AC', 'kitchen', 'bathroom', 'TV', 'radio', 'refrigerator', 'microwave', 'gas', 'water'] as const).map((k) => (
                        <label key={k} className={styles.check}>
                            <input type="checkbox" checked={filters.features[k]} onChange={() => onToggleFeat(k)}/> {k}
                        </label>
                    ))}
                </div>
            </div>


            <button className={styles.searchBtn} onClick={() => resetAndFetch()}>Search</button>
        </aside>
    );
}