import React, { useState, useEffect } from 'react';
import getMyAge from '@/utils/getMyAge';
import { createUseStyles } from 'react-jss';
import Container from '@/ui-components/Container';
import theme from '@/theme';
import Navigation from '@/ui/Navigation';
import NavigationItem from '@/ui/NavigationItem';

const useStyles = createUseStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.text.primary,
    },
    marker: {
        color: theme.palette.primary,
        textDecoration: 'unset',
        '&::selection': {
            background: theme.palette.text.primary
        },
    },
    headerWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    header: {
        margin: 0,
        fontSize: 48,
        fontWeight: 900,
    },
    tag: {
        margin: 0,
        fontSize: 48,
        opacity: 0.4,
        color: theme.palette.text.secondary,
        marginLeft: '0.3em',
        fontWeight: 900,
    },
    about: {
        fontSize: 36,
        maxWidth: 920,
        fontWeight: 600,
    },
    megafon: {
        color: '#00B956',
        textDecoration: 'unset',
        transition: theme.transitions.default,
        '&:hover': {
            color: theme.palette.text.primary,
        },
        '&::selection': {
            background: '#731982',
        },
    }
});

function AboutMeScreen() {
    const classes = useStyles();
    const [currAge, setCurrAge] = useState(getMyAge());

    useEffect(() => {
        const timer = setInterval(() => setCurrAge(getMyAge()), 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <main className={classes.root}>
            <Container>
                <div>
                    <span className={classes.headerWrapper}>
                        <h1 className={classes.header}>Danil Zakhvatkin</h1>
                        <h3 className={classes.tag}>
                            / web developer
                            <span className={classes.tag}>/ designer</span>
                        </h3>
                    </span>
                    <p className={classes.about}>
                        Hi, I am
                        {' '}
                        <a
                            href="/projects"
                            rel="noreferrer"
                            className={classes.marker}
                        >
                            developing web applications
                        </a>
                        , and other interesting little things.
                        My name is Danil Zakhvatkin, I am
                        {' '}
                        {currAge}
                        {' '}
                        and now I am located in Samara, Russia.
                        Now i’m working in a
                        {' '}
                        <a
                            href="https://megafon.ru"
                            target="_blank"
                            rel="noreferrer"
                            className={classes.megafon}
                        >
                            MegaFon
                        </a>
                        .
                    </p>
                </div>
            </Container>
        </main>
    );
}

export default AboutMeScreen;
