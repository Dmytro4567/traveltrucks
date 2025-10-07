'use client';
import Link from 'next/link';
import styles from './CamperCard.module.css';
import {Camper} from '@/lib/types';
import RatingStars from '@/app/components/RatingStars/RatingStars';
import {priceToUi, splitLocation} from '@/lib/format';
import {useCampersStore} from '@/store/useCampersStore';


export default function CamperCard({item}: { item: Camper }) {
    const {toggleFavorite, favorites} = useCampersStore();
    const fav = favorites.includes(item.id);
    const {city, country} = splitLocation(item.location);
    return (
        <article className={styles.card}>
            <div className={styles.media}>
                <img src={item.gallery?.[0]?.thumb || '/images/placeholder.jpg'} alt={item.name}/>
            </div>
            <div className={styles.body}>
                <header className={styles.header}>
                    <h3>{item.name}</h3>
                    <div className={styles.price}>€{priceToUi(item.price)}</div>
                </header>
                <div className={styles.meta}>
                    <RatingStars value={item.rating}/>
                    <span>{city}, {country}</span>
                </div>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.actions}>
                    <button className={styles.favBtn} onClick={() => toggleFavorite(item.id)} aria-pressed={fav}>
                        {fav ? '♥ In favorites' : '♡ Add to favorites'}
                    </button>
                    <Link className={styles.more} href={`/catalog/${item.id}`}>Show more</Link>
                </div>
            </div>
        </article>
    );
}