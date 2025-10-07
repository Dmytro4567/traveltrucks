import Link from 'next/link';
import Banner from './components/Banner/Banner';
import styles from './page.module.css';

export default function HomePage() {
    return (
        <div className={styles.page}>
            <Banner/>
            <div className={styles.ctaWrap}>
                <Link href="/catalog" className="btn">View Now</Link>
            </div>
        </div>
    );
}