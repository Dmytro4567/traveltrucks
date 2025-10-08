'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import styles from '@/app/components/Header/Header.module.css';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.brand} aria-label="TravelTrucks — go to Home">
                <Image src="/logo.svg" alt="TravelTrucks" width={136} height={16} priority/>
            </Link>

            <nav className={styles.nav}>
                <Link
                    href="/"
                    className={`${styles.link} ${pathname === '/' ? styles.linkActive : ''}`}
                >
                    Home
                </Link>
                <Link
                    href="/catalog"
                    className={`${styles.link} ${pathname.startsWith('/catalog') ? styles.linkActive : ''}`}
                >
                    Catalog
                </Link>
            </nav>
        </header>
    );
}
