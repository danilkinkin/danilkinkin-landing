import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AboutScreen from '@/screens/about';
import ContactsScreen from '@/screens/contacts';
import ProjectsPage from '@/screens/projects/index';
import styles from './ComputePage.module.css';
import clsx from 'clsx';

function PageCompute(props) {
    const router = useRouter();
    const [path, setPath] = useState(props.path);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        setIsFirstRender(false);
        const handleRouteChange = (url) => {
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

            setAnimating(true);
            setPath(url);
            setTimeout(() => setAnimating(false), 600);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <div className={clsx(styles.guide, path === '/contacts' && styles.showContacts, animating && styles.animating)}>
            <aside className={styles.aside}>
                <ContactsScreen />
            </aside>
            <main className={styles.main}>
                <AboutScreen />
                <ProjectsPage />
            </main>
        </div>
    );
};

function getPath(req, fallback) {
    if (req) {
        return req.url;
    } else if (typeof window !== 'undefined') {
        return window.location.pathname;
    } else {
        return fallback;
    }
}

PageCompute.getInitialProps = async (ctx) => {
    const path = getPath(ctx.req, '');

    return { path };
};

export default PageCompute;
