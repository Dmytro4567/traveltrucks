import './globals.css';
import styles from './layout.module.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Header from './components/Header/Header';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
    title: 'TravelTrucks – Camper rentals',
    description: 'Catalog of campers with filters, details, reviews and booking form.',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
        <Header/>
        <main className={styles.main}>{children}</main>
        </body>
        </html>
    );
}
