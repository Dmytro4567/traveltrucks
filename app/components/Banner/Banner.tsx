import styles from './Banner.module.css';
import Link from 'next/link';
import Button from "@/app/components/ui/Button/Button";


export default function Banner() {
    return (
        <section className={styles.wrap}>
            <div className={styles.content}>
                <h1>Campers of your dreams</h1>
                <p>You can find anything you want in our catalog</p>
                <Button href="/catalog">View Now</Button>
            </div>
        </section>
    );
}