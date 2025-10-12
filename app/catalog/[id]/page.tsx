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

    // хелпер для красивой метки формы
    const formLabel =
        camper.form === 'panelTruck'
            ? 'Panel truck'
            : camper.form === 'fullyIntegrated'
                ? 'Fully integrated'
                : 'Alcove';

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>{camper.name}</h1>

            {/* рейтинг + локация */}
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

            {/* галерея */}
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

            {/* вкладки + форма */}
            <div className={styles.content}>
                <Tabs
                    features={
                        <section className={styles.featuresPanel}>
                            {/* бейджи сверху */}
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
                                            {/* при желании замени на свой id иконки топлива */}
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

                            {/* Vehicle details */}
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
                        <div>
                            <h3>Reviews</h3>
                            <ul>
                                {(camper.reviews ?? []).map((r: Review, i: number) => (
                                    <li key={i} className={styles.reviewItem}>
                                        <div className={styles.reviewAuthor}>{r.reviewer_name}</div>
                                        <div>Rating: {r.reviewer_rating} / 5</div>
                                        <p>{r.comment}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                />

                <BookingForm camperName={camper.name}/>
            </div>
        </div>
    );
}


