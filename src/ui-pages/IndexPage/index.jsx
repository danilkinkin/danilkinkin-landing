import React, { useEffect, useState } from 'react';
import Navigation from '@/ui/Navigation';
import NavigationItem from '@/ui/NavigationItem';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import theme, { createTransition, mergeTransitions } from '@/theme';
import clsx from 'clsx';
import AboutMeScreen from './AboutMeScreen';
import ContactsScreen from './ContactsScreen';

const useStyles = createUseStyles({
    root: {},
    contacts: {
        width: '100vw',
        transition: createTransition(['transform'], theme.transitions.enter),
        position: 'fixed',
        left: 0,
        top: 0,
        transform: 'translateX(-680px)',
        opacity: 0,
    },
    shiftContactsBlock: {
        transform: 'translateX(0)',
        opacity: 1,
        transition: mergeTransitions(
            createTransition(['transform'], theme.transitions.enter),
            createTransition(['opacity'], theme.transitions.default),
        ),
    },
    mainBlock: { transition: createTransition(['transform'], theme.transitions.enter) },
    shiftMainBlock: { transform: 'translateX(min(max(70vw, 800px), 1300px))' },
    shiftMainBlockFirstFrame: {
        transform: 'translateX(90vw)',
        opacity: 0,
    },
});

function IndexPage({ path: loadPath }) {
    const classes = useStyles();
    const router = useRouter();
    const [path, setPath] = useState(loadPath);
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
        <div className={classes.root}>
            <div
                className={clsx(
                    classes.contacts,
                    path.includes('/contacts') && classes.shiftContactsBlock,
                )}
            >
                <ContactsScreen />
            </div>
            <div
                className={clsx(
                    classes.mainBlock,
                    path.includes('/contacts') && classes.shiftMainBlock,
                    isFirstRender && path.includes('/contacts') && classes.shiftMainBlockFirstFrame,
                )}
            >
                <AboutMeScreen />
            </div>
            <Navigation>
                {path === '/contacts' && (
                    <NavigationItem title="/about me" to="/" />
                )}
                {path !== '/contacts' && (
                    <NavigationItem title="/contact with me" to="/contacts" />
                )}
            </Navigation>
        </div>
    );
}

export default IndexPage;
