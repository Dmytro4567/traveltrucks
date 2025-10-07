import {memo} from 'react';

export default memo(function RatingStars({value}: { value: number }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    return (
        <div aria-label={`Rating ${value}`}>{'★'.repeat(full)}{half ? '½' : ''}</div>
    );
});