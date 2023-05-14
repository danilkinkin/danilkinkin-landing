import React from "react";
import Link from "next/link";
import styles from './Header.module.scss';
import MailIcon from '@/icons/Mail';

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <Link className={styles.link} href="/contacts">contact with me</Link>
                <Link className={styles.link} href="mailto:hello@danilkinkin.com">
                    <MailIcon className={styles.linkIcon} />
                    hello@danilkinkin.com
                </Link>
            </nav>
        </header>
    )
}