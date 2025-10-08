'use client';
import {useEffect} from 'react';
import Filters from '@/app/components/Filters/Filters';
import CamperCard from '@/app/components/CamperCard/CamperCard';
import Loader from '@/app/components/Loader/Loader';
import {useCampersStore} from '@/store/useCampersStore';
import styles from './Catalog.module.css';
import Button from "@/app/components/ui/Button/Button";

export default function CatalogPage() {
    const {items, total, isLoading, error, loadMore, resetAndFetch, hydrateFavorites} = useCampersStore();

    useEffect(() => {
        hydrateFavorites();
        void resetAndFetch();
    }, [hydrateFavorites, resetAndFetch]);

    return (
        <div className={styles.layout}>
            <Filters/>

            <section>
                {isLoading && items.length === 0 && <Loader/>}
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.cards}>
                    {items.map((c) => <CamperCard key={c.id} item={c}/>)}
                </div>
                <div className={styles.loadMoreWrap}>
                    {items.length < total && (
                        <Button variant="outline" onClick={() => loadMore()}>Load more</Button>
                    )}
                </div>
            </section>
        </div>
    );
}