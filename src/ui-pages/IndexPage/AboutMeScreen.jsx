import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import MediaQuery from 'react-responsive';
import getMyAge from '@/utils/getMyAge';
import Container from '@/ui-components/Container';
import theme, { createTransition } from '@/theme';

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
        '&::selection': { background: theme.palette.text.primary },
    },
    headerWrapper: {
        display: 'inline-flex',
        alignItems: 'center',
        // flexWrap: 'wrap',
        maxWidth: '100%',
    },
    header: {
        margin: 0,
        fontSize: 48,
        fontWeight: 900,
        marginRight: '0.3em',
        whiteSpace: 'nowrap',
        '& + $tag': { marginLeft: 0 },
    },
    tag: {
        margin: 0,
        fontSize: 48,
        opacity: 0.4,
        color: theme.palette.text.secondary,
        marginLeft: '0.3em',
        fontWeight: 900,
        whiteSpace: 'nowrap',
    },
    about: {
        fontSize: 36,
        maxWidth: 920,
        fontWeight: 600,
        marginBottom: 0,
    },
    megafon: {
        color: '#00a94e',
        textDecoration: 'unset',
        transition: createTransition(['color'], theme.transitions.default),
        '&:hover': { color: theme.palette.text.primary },
        '&::selection': { background: '#731982' },
    },
    ticketscloud: {
        color: '#e9cf11',
        textDecoration: 'unset',
        transition: createTransition(['color'], theme.transitions.default),
        '&:hover': { color: theme.palette.text.primary },
        '&::selection': { background: '#12171b' },
    },
    [`@media (max-width: ${theme.breakpoints.mobile}px)`]: {
        headerWrapper: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        header: {
            fontSize: 36,
            whiteSpace: 'normal',
        },
        tag: { fontSize: 24 },
        about: {
            fontSize: 24,
            maxWidth: 620,
        },
    },
    [`@media (max-width: ${theme.breakpoints.smallMobile}px)`]: {
        header: { fontSize: 28 },
        tag: { fontSize: 20 },
        about: { fontSize: 18 },
    },
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
                        <h1 className={classes.header}>Danil Зakhvatkin</h1>
                        <h3 className={classes.tag}>
                            <MediaQuery minWidth={theme.breakpoints.mobile}>
                                {'/ '}
                            </MediaQuery>
                            web developer
                            <span className={classes.tag}>/ designer</span>
                        </h3>
                    </span>
                    <p className={classes.about}>
                        Hi, I am
                        {' '}
                        <span className={classes.marker}>
                            developing web applications
                        </span>
                        , and other interesting little things.
                        My name is Danil Zakhvatkin, I am
                        {' '}
                        {currAge}
                        {' '}
                        and now I am located in Yerevan, Armenia.
                        Before that I worked in
                        {' '}
                        <a
                            href="https://megafon.ru"
                            target="_blank"
                            rel="noreferrer"
                            className={classes.megafon}
                        >
                            MegaFon
                        </a>
                        , now I work in
                        {' '}
                        <a
                            href="https://ticketscloud.com"
                            target="_blank"
                            rel="noreferrer"
                            className={classes.ticketscloud}
                        >
                            Ticketscloud
                        </a>
                        .
                    </p>
                </div>
            </Container>
        </main>
    );
}

export default AboutMeScreen;
