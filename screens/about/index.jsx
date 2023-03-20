import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Header from '@/components/Header';
import Container from '@/components/Container';
import AboutMeBlock from './AboutMeBlock';
import styles from './About.module.css';

function IndexPage() {
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
        <div className={styles.root}>
            <Header />
            <Container align="left" className={styles.aboutMe}>
                <AboutMeBlock />
            </Container>
            
        </div>
    );
}

export default IndexPage;
