import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import getMyAge from '@/utils/getMyAge';
import Container from '@/components/Container';
import theme, { createTransition } from '@/constants/theme';
import styles from './AboutMe.module.scss'
import clsx from 'clsx';
import DevelopingBlock from './DevelopingBlock';

const delayBeetwenChars = 10

export function AnimatedBlock({ delay = 0, noSpaceAfter = false, value, className }) {
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

export function AnimateOrder({ delay = 0, children }) {
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
                    <AnimatedBlock value="Hi," />
                    <AnimatedBlock value="I am" />
                    <DevelopingBlock />
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
                        <AnimatedBlock value=", or simple" />
                        <AnimatedBlock value="@danilkinkin" noSpaceAfter />
                    </AnimateOrder>
                    <AnimateOrder delay={2400}>
                        <AnimatedBlock value="." />
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
                    <AnimateOrder delay={2800}>
                        <AnimatedBlock value="Now" />
                        <AnimatedBlock value="work" />
                        <AnimatedBlock value="for" />
                        <AnimatedBlock className={styles.ticketscloud} value="Ticketscloud" />
                    </AnimateOrder>
                    <AnimatedBlock value="and before" />
                    <AnimatedBlock value="worked for" />
                    <AnimatedBlock className={styles.megafon} value="MegaFon" noSpaceAfter />
                    <AnimatedBlock value=","/>
                    <AnimatedBlock value="WebTelco" noSpaceAfter />
                    
                </AnimateOrder>                
            </h2>
        </div>
    );
}

export default AboutMeBlock;
