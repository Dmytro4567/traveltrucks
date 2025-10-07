'use client';
import styles from './Tabs.module.css';
import {ReactNode, useState} from 'react';


export default function Tabs({features, reviews}: { features: ReactNode; reviews: ReactNode }) {
    const [tab, setTab] = useState<'features' | 'reviews'>('features');
    return (
        <div className={styles.wrap}>
            <nav className={styles.tabs}>
                <button className={tab === 'features' ? styles.active : ''}
                        onClick={() => setTab('features')}>Features
                </button>
                <button className={tab === 'reviews' ? styles.active : ''} onClick={() => setTab('reviews')}>Reviews
                </button>
            </nav>
            <div className={styles.panel}>{tab === 'features' ? features : reviews}</div>
        </div>
    );
}