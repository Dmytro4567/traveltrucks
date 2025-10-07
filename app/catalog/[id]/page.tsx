// REPLACE FILE
import Image from 'next/image';
import Tabs from '@/app/components/Tabs/Tabs';
import BookingForm from '@/app/components/BookingForm/BookingForm';
import {fetchCamperById} from '@/lib/api';
import {priceToUi, splitLocation} from '@/lib/format';
import styles from './CamperDetails.module.css';
import type {GalleryItem, Review} from '@/lib/types';

export default async function CamperDetails({params}: { params: { id: string } }) {
    const camper = await fetchCamperById(params.id);
    const {city, country} = splitLocation(camper.location);

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.location}>{city}, {country}</div>
            <div className={styles.price}>€{priceToUi(camper.price)}</div>

            <div className={styles.gallery}>
                {(camper.gallery ?? []).slice(0, 4).map((g: GalleryItem, i: number) => (
                    <Image key={i} src={g.thumb} alt={`${camper.name} ${i + 1}`} width={280} height={200}
                           className={styles.galleryImg}/>
                ))}
            </div>

            <p className={styles.desc}>{camper.description}</p>

            <div className={styles.content}>
                <Tabs
                    features={
                        <div>
                            <h3>Features</h3>
                            <ul>
                                {['transmission', 'engine', 'AC', 'bathroom', 'kitchen', 'TV', 'radio', 'refrigerator', 'microwave', 'gas', 'water', 'form', 'length', 'width', 'height', 'tank', 'consumption']
                                    .filter((k) => camper[k as keyof typeof camper] !== undefined)
                                    .map((k) => <li key={k}>
                                        <strong>{k}</strong>: {String(camper[k as keyof typeof camper])}</li>)}
                            </ul>
                        </div>
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
