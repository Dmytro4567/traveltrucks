import Image from 'next/image';
import Tabs from '@/app/components/Tabs/Tabs';
import BookingForm from '@/app/components/BookingForm/BookingForm';
import RatingStars from '@/app/components/RatingStars/RatingStars';
import {fetchCamperById} from '@/lib/api';
import {priceToUi, splitLocation} from '@/lib/format';
import styles from './CamperDetails.module.css';
import type {GalleryItem, Review} from '@/lib/types';

export default async function CamperDetails({params}: { params: { id: string } }) {
    const camper = await fetchCamperById(params.id);
    const {city, country} = splitLocation(camper.location);
    const reviewsCount = camper.reviews?.length ?? 0;

    const formLabel =
        camper.form === 'panelTruck'
            ? 'Panel truck'
            : camper.form === 'fullyIntegrated'
                ? 'Fully integrated'
                : 'Alcove';

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.metaBar}>
                <RatingStars value={camper.rating} reviews={reviewsCount}/>
                <span className={styles.location}>
          <svg className={styles.locIcon} aria-hidden="true">
            <use href="/sprite.svg#icon-bi_grid-1x2"/>
          </svg>
                    {city}, {country}
        </span>
            </div>
            <div className={styles.price}>€{priceToUi(camper.price)}</div>
            <div className={styles.gallery}>
                {(camper.gallery ?? []).slice(0, 4).map((g: GalleryItem, i: number) => (
                    <Image
                        key={i}
                        src={g.thumb}
                        alt={`${camper.name} ${i + 1}`}
                        width={280}
                        height={200}
                        className={styles.galleryImg}
                    />
                ))}
            </div>

            <p className={styles.desc}>{camper.description}</p>

            <div className={styles.content}>
                <Tabs
                    features={
                        <section className={styles.featuresPanel}>
                            <ul className={styles.badges}>
                                {camper.transmission === 'automatic' && (
                                    <li className={styles.badge}>
                                        <svg className={styles.badgeIcon} aria-hidden="true">
                                            <use href="/sprite.svg#icon-diagram"/>
                                        </svg>
                                        Automatic
                                    </li>
                                )}
                                {camper.AC && (
                                    <li className={styles.badge}>
                                        <svg className={styles.badgeIcon} aria-hidden="true">
                                            <use href="/sprite.svg#icon-wind"/>
                                        </svg>
                                        AC
                                    </li>
                                )}
                                {camper.engine && (
                                    <li className={styles.badge}>
                                        <svg className={styles.badgeIcon} aria-hidden="true">
                                            <use href="/sprite.svg#icon-bi_grid"/>
                                        </svg>
                                        {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
                                    </li>
                                )}
                                {camper.kitchen && (
                                    <li className={styles.badge}>
                                        <svg className={styles.badgeIcon} aria-hidden="true">
                                            <use href="/sprite.svg#icon-cup-hot"/>
                                        </svg>
                                        Kitchen
                                    </li>
                                )}
                                {camper.radio && (
                                    <li className={styles.badge}>
                                        <svg className={styles.badgeIcon} aria-hidden="true">
                                            <use href="/sprite.svg#icon-tv"/>
                                        </svg>
                                        Radio
                                    </li>
                                )}
                            </ul>

                            <h4 className={styles.detailsTitle}>Vehicle details</h4>
                            <div className={styles.details}>
                                <dl className={styles.dl}>
                                    <dt>Form</dt>
                                    <dd>{formLabel}</dd>

                                    {camper.length && (
                                        <>
                                            <dt>Length</dt>
                                            <dd>{camper.length}</dd>
                                        </>
                                    )}
                                    {camper.width && (
                                        <>
                                            <dt>Width</dt>
                                            <dd>{camper.width}</dd>
                                        </>
                                    )}
                                    {camper.height && (
                                        <>
                                            <dt>Height</dt>
                                            <dd>{camper.height}</dd>
                                        </>
                                    )}
                                    {camper.tank && (
                                        <>
                                            <dt>Tank</dt>
                                            <dd>{camper.tank}</dd>
                                        </>
                                    )}
                                    {camper.consumption && (
                                        <>
                                            <dt>Consumption</dt>
                                            <dd>{camper.consumption}</dd>
                                        </>
                                    )}
                                </dl>
                            </div>
                        </section>
                    }
                    reviews={
                        <div className={styles.reviews}>
                            {(camper.reviews ?? []).map((r: Review, i: number) => {
                                const initial = r.reviewer_name?.[0]?.toUpperCase() ?? '•';
                                const filled = Math.round(r.reviewer_rating);

                                return (
                                    <article key={i} className={styles.review}>
                                        <div className={styles.avatar} aria-hidden="true">
                                            {initial}
                                        </div>

                                        <div className={styles.reviewBody}>
                                            <div className={styles.reviewHead}>
                                                <div className={styles.reviewName}>{r.reviewer_name}</div>
                                                <div
                                                    className={styles.reviewStars}
                                                    aria-label={`Rating ${r.reviewer_rating} of 5`}
                                                >
                                                    {Array.from({length: 5}).map((_, idx) => (
                                                        <svg key={idx} className={styles.starSm} aria-hidden="true">
                                                            <use
                                                                href={`/sprite.svg#${
                                                                    idx < filled ? 'icon-starPressed' : 'icon-star'
                                                                }`}
                                                            />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className={styles.reviewText}>{r.comment}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    }
                />
                <BookingForm camperName={camper.name}/>
            </div>
        </div>
    );
}


