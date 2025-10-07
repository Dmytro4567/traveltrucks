import styles from './Banner.module.css';
import Link from 'next/link';


export default function Banner() {
    return (
        <section className={styles.wrap}>
            <div className={styles.content}>
                <h1>Campers of your dreams</h1>
                <p>You can find anything you want in our catalog</p>
                <Link href="/catalog" className={styles.cta}>View Now</Link>
            </div>
        </section>
    );
}