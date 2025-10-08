'use client';
import Link from 'next/link';
import React from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline';

type BaseProps = {
    children: React.ReactNode;
    variant?: Variant;
    className?: string;
};

type ButtonProps = BaseProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = BaseProps &
    { href: string } &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

function cx(...v: Array<string | false | undefined>) {
    return v.filter(Boolean).join(' ');
}
function isLink(p: ButtonProps | LinkProps): p is LinkProps {
    return typeof (p as LinkProps).href === 'string';
}

export default function Button(props: ButtonProps | LinkProps) {
    const { children, variant = 'primary', className } = props;
    const classes = cx(styles.btn, styles[variant], className);

    if (isLink(props)) {
        const { href, ...rest } = props;
        return (
            <Link href={href} className={classes} {...rest}>
                {children}
            </Link>
        );
    }
    const { ...rest } = props;
    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
}
