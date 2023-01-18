import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Header from '@/components/Header';
import Container from '@/components/Container';
import styles from './Contacts.module.scss';
import Link from "next/link";
import MailIcon from '@/icons/Mail';
import ExternalOpenIcon from '@/icons/ExternalOpen';

function LinkService({ href, name }) {
    return (
        <li>
            <Link className={styles.link} target="_blank" href={href}>
                {name}
                <ExternalOpenIcon />
            </Link>
        </li>
    );
}

function ContactsPage() {
    const router = useRouter();
    const [path, setPath] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
        const handleRouteChange = (url /* , { shallow } */) => {
            if (url === '/') {
                document.documentElement.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            } else if (url === '/contacts') {
                // contacts block
            } else {
                router.replace('/');
                return;
            }

            setPath(url);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <Container gap="100px" align="left" className={styles.contacts}>
            <span className={styles.caption}>email</span>
            <Link className={styles.email} href="mailto:hello@danilkinkin.com">
                <MailIcon />
                hello@danilkinkin.com
            </Link>
            <span className={clsx(styles.caption, styles.divider)}>
                And also i`m avaiable in
                <hr />
            </span>
            <nav className={styles.linksWrapper}>   
                <section>
                    <h3>main</h3> 
                    <ul>
                        <li>
                            <Link className={styles.link} target="_blank" href="mailto:hello@danilkinkin.com">
                            hello@danilkinkin.com
                                <MailIcon />
                            </Link>
                        </li>
                        <LinkService name="github" href="https://github.com/danilkinkin" />
                        <LinkService name="telegram" href="https://t.me/danilkinkin" />
                    </ul>   
                </section>
                <section>
                    <h3>social & media</h3> 
                    <ul>
                        <LinkService name="github" href="https://github.com/danilkinkin" />
                        <LinkService name="telegram" href="https://t.me/danilkinkin" />
                        <LinkService name="unsplash" href="https://unsplash.com/@danilkinkin" />
                        <LinkService name="instagram" href="https://www.instagram.com/danilkinkin/" />
                        <LinkService name="habr" href="https://habr.com/ru/users/danilkinkin/" />
                    </ul>   
                </section>
                <section>
                    <h3>work</h3> 
                    <ul>
                        <LinkService name="linkedin" href="https://www.linkedin.com/in/danilkinkin/" />
                        <LinkService name="hh" href="https://samara.hh.ru/resume/06760663ff05853e470039ed1f414d56723455" />
                    </ul>   
                </section> 
            </nav>
        </Container>
    );
}

export default ContactsPage;
