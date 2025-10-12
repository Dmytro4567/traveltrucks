'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CamperCard.module.css';
import {Camper} from '@/lib/types';
import RatingStars from '@/app/components/RatingStars/RatingStars';
import {priceToUi, splitLocation} from '@/lib/format';
import {useCampersStore} from '@/store/useCampersStore';

export default function CamperCard({item}: { item: Camper }) {
    const {toggleFavorite, favorites} = useCampersStore();
    const fav = favorites.includes(item.id);
    const {city, country} = splitLocation(item.location);
    const cover = item.gallery?.[0]?.thumb || '/images/placeholder.jpg';

    const tags: { id: string; label: string }[] = [];
    if (item.transmission === 'automatic') tags.push({id: 'icon-diagram', label: 'Automatic'});
    if (item.kitchen) tags.push({id: 'icon-cup-hot', label: 'Kitchen'});
    if (item.TV) tags.push({id: 'icon-tv', label: 'TV'});
    if (item.bathroom) tags.push({id: 'icon-ph_shower', label: 'Bathroom'});
    if (item.AC) tags.push({id: 'icon-wind', label: 'AC'});

    return (
        <article className={styles.card}>
            <div className={styles.media}>
                <Image
                    src={cover}
                    alt={item.name}
                    fill
                    className={styles.img}
                    sizes="(max-width: 1024px) 100vw, 280px"
                />
            </div>

            <div className={styles.body}>
                <header className={styles.header}>
                    <h3>{item.name}</h3>
                    <div className={styles.priceWrap}>
                        <div className={styles.price}>€{priceToUi(item.price)}</div>
                        <button
                            type="button"
                            className={styles.heartBtn}
                            aria-pressed={fav}
                            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                            title={fav ? 'In favorites' : 'Add to favorites'}
                            onClick={() => toggleFavorite(item.id)}
                        >
                            <svg className={styles.heartIcon} aria-hidden="true">
                                <use href={`/sprite.svg#${fav ? 'icon-heartpressed' : 'icon-heart'}`}/>
                            </svg>
                        </button>
                    </div>
                </header>

                <div className={styles.meta}>
                    <RatingStars value={item.rating} reviews={item.reviews?.length ?? 0}/>
                    <span className={styles.loc}>
                         <svg className={styles.locIcon} aria-hidden="true">
                             <use href="/sprite.svg#icon-bi_grid-1x2"/>
                         </svg>
                        {city}, {country}
                    </span>
                </div>

                <p className={styles.desc}>{item.description}</p>

                {tags.length > 0 && (
                    <ul className={styles.tags} aria-label="features">
                        {tags.map((t, i) => (
                            <li key={i} className={styles.tag}>
                                <svg className={styles.tagIcon} aria-hidden="true">
                                    <use href={`/sprite.svg#${t.id}`}/>
                                </svg>
                                {t.label}
                            </li>
                        ))}
                    </ul>
                )}

                <div className={styles.actions}>
                    {/* Кнопку избранного снизу убрали */}
                    <Link className={styles.more} href={`/catalog/${item.id}`}>Show more</Link>
                </div>
            </div>
        </article>
    );
}
