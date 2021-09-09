import React, { Fragment, useEffect, useState } from 'react';
import Navigation from '@/ui/Navigation';
import NavigationItem from '@/ui/NavigationItem';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import theme from '@/theme';
import clsx from 'clsx';
import AboutMeScreen from './AboutMeScreen';
import ContactsScreen from './ContactsScreen';
import ProjectsScreen from './ProjectsScreen';

const useStyles = createUseStyles({
    root: {},
    contacts: {
        width: 680,
        transition: theme.transitions.enter,
        position: 'fixed',
        left: 0,
        top: 0,
        transform: 'translateX(-680px)',
    },
    shiftContactsBlock: { transform: 'translateX(0)' },
    mainBlock: { transition: theme.transitions.enter },
    shiftMainBlock: { transform: 'translateX(70vw)' },
});

function IndexPage() {
    const classes = useStyles();
    const router = useRouter();
    const [path, setPath] = useState('/');

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            setPath(url);
            if (url === '/') {
                console.log('scroll to about');
                document.documentElement.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            } else if (url === '/projects') {
                console.log('scroll to projects');
                document.documentElement.scrollTo({
                    top: document.documentElement.clientHeight,
                    left: 0,
                    behavior: 'smooth'
                });
            }
            console.log(
                `App is changing to ${url} ${
                    shallow ? 'with' : 'without'
                } shallow routing`,
            );
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <div className={classes.root}>
            <div className={clsx(classes.contacts, path.includes('/contacts') && classes.shiftContactsBlock)}>
                <ContactsScreen />
            </div>
            <div className={clsx(classes.mainBlock, path.includes('/contacts') && classes.shiftMainBlock)}>
                <AboutMeScreen />
                <ProjectsScreen />
            </div>
            <Navigation>
                {path === '/contacts' && (
                    <NavigationItem title="/about me" to="/" />
                )}
                {path !== '/contacts' && (
                    <NavigationItem title="/contact with me" to="/contacts" />
                )}
                {path !== '/projects' && (
                    <NavigationItem title="/my projects" to="/projects" />
                )}
                {path === '/projects' && (
                    <NavigationItem title="/about me" to="/" />
                )}
            </Navigation>
        </div>
    );
}

export default IndexPage;
