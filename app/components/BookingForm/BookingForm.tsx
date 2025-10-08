'use client';
import styles from './BookingForm.module.css';
import {useState} from 'react';
import Button from "@/app/components/ui/Button/Button";


export default function BookingForm({camperName}: { camperName: string }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [ok, setOk] = useState<string>('');


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
// Імітуємо успішну бронь (за ТЗ достатньо нотифікації)
        setOk(`🎉 Booking request sent for "${camperName}" on ${date}. We\'ll contact you at ${email}.`);
        setName('');
        setEmail('');
        setDate('');
        setNote('');
    };


    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h3>Book your camper now</h3>
            <label>Name<input value={name} onChange={e => setName(e.target.value)} required/></label>
            <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required/></label>
            <label>Booking date<input type="date" value={date} onChange={e => setDate(e.target.value)}
                                      required/></label>
            <label>Comment<textarea value={note} onChange={e => setNote(e.target.value)}/></label>
            <Button type="submit">Send</Button>
            {ok && <p className={styles.ok}>{ok}</p>}
        </form>
    );
}