import './globals.css';
import styles from './layout.module.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'TravelTrucks – Camper rentals',
    description: 'Catalog of campers with filters, details, reviews and booking form.',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
        <header className={styles.header}>TravelTrucks</header>
        <main className={styles.main}>{children}</main>
        </body>
        </html>
    );
}