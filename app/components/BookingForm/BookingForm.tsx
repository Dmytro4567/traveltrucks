'use client';
import styles from './BookingForm.module.css';
import {useState} from 'react';
import Button from '@/app/components/ui/Button/Button';

export default function BookingForm({camperName}: { camperName: string }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [ok, setOk] = useState<string>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOk(
            `Booking request sent for "${camperName}" on ${date}. We'll contact you at ${email}.`
        );
        setName('');
        setEmail('');
        setDate('');
        setNote('');
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h3 className={styles.title}>Book your campervan now</h3>
            <p className={styles.note}>Stay connected! We are always ready to help you.</p>

            <label className={styles.field}>
                <input
                    className={styles.input}
                    placeholder="Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            <label className={styles.field}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label className={styles.field}>
                <input
                    className={styles.input}
                    type="date"
                    placeholder="Booking date*"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>

            <label className={styles.field}>
        <textarea
            className={`${styles.input} ${styles.textarea}`}
            placeholder="Comment"
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />
            </label>

            <div className={styles.actions}>
                <Button variant="primary" type="submit">Send</Button>
            </div>

            {ok && <p className={styles.ok}>{ok}</p>}
        </form>
    );
}
