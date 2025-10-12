import {memo} from "react";
import styles from "./RatingStars.module.css";

type Review = { reviewer_name: string; reviewer_rating: number; comment: string };

type Props = {
    value: number;
    reviews: number | Review[];
    spriteUrl?: string;
    starSymbolId?: string;
    className?: string;
};

const plural = (n: number) => (n === 1 ? "Review" : "Reviews");

export default memo(function RatingStars({
                                             value,
                                             reviews,
                                             spriteUrl = "/sprite.svg",
                                             starSymbolId = "icon-starPressed",
                                             className,
                                         }: Props) {
    const reviewsCount = Array.isArray(reviews) ? reviews.length : (reviews ?? 0);

    return (
        <span
            className={[styles.wrap, className].filter(Boolean).join(" ")}
            aria-label={`Rating ${value}, ${reviewsCount} ${plural(reviewsCount)}`}
        >
      <svg className={styles.icon} aria-hidden="true" focusable="false">
        <use href={`${spriteUrl}#${starSymbolId}`}/>
      </svg>
      <span className={styles.value}>{value.toFixed(1)}</span>
      <span className={styles.reviews}>({reviewsCount} {plural(reviewsCount)})</span>
    </span>
    );
});
