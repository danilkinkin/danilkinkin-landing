import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import getMyAge from '@/utils/getMyAge';
import Container from '@/components/Container';
import theme, { createTransition } from '@/constants/theme';
import styles from './AboutMe.module.css'
import clsx from 'clsx';

/* const useStyles = createUseStyles({
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
}); */

const delayBeetwenChars = 10

function AnimatedBlock({ delay = 0, noSpaceAfter = false, value, className }) {
    return (
        <span className={clsx(styles.textLine, !noSpaceAfter && styles.spaceAfter, className)}>
            {value.split('').map((char, index) => (
                <span 
                    style={{ ['--delay']: `${index * delayBeetwenChars + delay + 10}ms` }}
                    className={clsx(styles.textChar, char === ' ' && styles.textCharSpace)}
                >
                    {char}
                </span>
            ))}
        </span>
    )
}

function AnimateOrder({ delay = 0, children }) {
    let comulutiveDelay = 0;

    return children.map((children) => {
        if (children.type !== AnimatedBlock) return children;

        comulutiveDelay += children.props.value.length;

        return React.createElement(
            children.type,
            {
                ...children.props,
                delay: (comulutiveDelay - children.props.value.length) * delayBeetwenChars + delay,
            },
        );
    });
}

function AboutMeBlock() {
    const [age, setAge] = useState(getMyAge());
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setAge(getMyAge()), 1000);

        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <div>
            <h2 className={clsx(styles.text, show && styles.show)}>
                <AnimateOrder delay={3600}>
                    <AnimatedBlock value="Hello," />
                    <AnimatedBlock value="I am" />
                    <AnimateOrder delay={1000}>
                        <AnimatedBlock className={styles.developing} value="developing" />
                        <AnimatedBlock className={styles.developing} value="web applications" />
                    </AnimateOrder>
                    <AnimatedBlock value="and other" />
                    <AnimatedBlock value="interesting" />
                    <AnimatedBlock value="little" />
                    <AnimatedBlock value="things." />
                    <AnimateOrder delay={0}>
                        <AnimatedBlock value="My name" />
                        <AnimatedBlock value="is" />
                        <AnimatedBlock 
                            className={styles.myName}
                            value="Danil Зakhvatkin" 
                            noSpaceAfter 
                        />
                    </AnimateOrder>
                    <AnimateOrder delay={2400}>
                        <AnimatedBlock value=","/>
                        <AnimatedBlock value="I am" />
                        <AnimatedBlock value={`${age} years old`} />
                    </AnimateOrder>
                    <AnimateOrder delay={5000}>
                        <AnimatedBlock value="and" />
                        <AnimatedBlock value="currently based" />
                        <AnimatedBlock value="in" />
                        <AnimatedBlock value="Yerevan, Armenia" noSpaceAfter />
                        <AnimatedBlock value="." />
                    </AnimateOrder>
                    <AnimatedBlock value="I worked" />
                    <AnimatedBlock value="for" />
                    <AnimatedBlock className={styles.megafon} value="MegaFon" noSpaceAfter />
                    <AnimatedBlock value="." />
                    <AnimateOrder delay={2800}>
                        <AnimatedBlock value="Now" />
                        <AnimatedBlock value="I work" />
                        <AnimatedBlock value="for" />
                        <AnimatedBlock className={styles.ticketscloud} value="Ticketscloud" noSpaceAfter />
                        <AnimatedBlock value="." noSpaceAfter/>
                    </AnimateOrder>
                </AnimateOrder>                
            </h2>
        </div>
    );
}

export default AboutMeBlock;
