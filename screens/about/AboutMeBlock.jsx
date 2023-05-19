import React, { useState, useEffect } from 'react';
import getMyAge from '@/utils/getMyAge';
import styles from './AboutMe.module.scss'
import clsx from 'clsx';
import DevelopingBlock from './DevelopingBlock';
import Nickname from './Nickname';
import Wave from './Wave';
import Planet from './Planet';
import WorkBlock from './WorkBlock';

const delayBeetwenChars = 10

export function AnimatedBlock({ delay = 0, noSpaceAfter = false, value, className, keyIndex }) {
    return (
        <span key={keyIndex} data-key={keyIndex} className={clsx(styles.textLine, !noSpaceAfter && styles.spaceAfter, className)}>
            {value.split('').map((char, index) => (
                <span 
                    key={`${keyIndex}-${index}`}
                    data-key={`${keyIndex}-${index}`}
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

    return React.Children.toArray(children).map((children, index) => {
        if (children.type !== AnimatedBlock && !('animatedBlock' in children.props)) return children;

        comulutiveDelay += children.props.value.length;

        return React.createElement(
            children.type,
            {
                ...children.props,
                key: children.props.value,
                keyIndex: children.props.value,
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
                <AnimateOrder delay={6000}>
                    <AnimatedBlock value="Hi," />
                    <AnimateOrder delay={2000}>
                        <AnimatedBlock value="I am" />
                    </AnimateOrder>
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
                        <AnimatedBlock value="," />
                        <AnimatedBlock value="or simple" />
                        <Nickname animatedBlock value="@danilkinkin" />
                    </AnimateOrder>
                    <AnimateOrder delay={3400}>
                        <AnimatedBlock value="." />
                        <AnimatedBlock value="I am" />
                        <AnimatedBlock value={`${age} years old`} />
                    </AnimateOrder>
                    <AnimateOrder delay={8000}>
                        <AnimatedBlock value="and" />
                        <AnimatedBlock value="currently" />
                        <AnimatedBlock value="based" />
                        <Planet />
                        <AnimatedBlock value="in" />
                        <AnimatedBlock value="Yerevan," />
                        <AnimatedBlock value="Armenia." />
                    </AnimateOrder>
                    <Wave />
                    <AnimateOrder delay={3800}>
                        <AnimatedBlock value="Now" />
                        <AnimatedBlock value="work" />
                        <AnimatedBlock value="for" />
                        <WorkBlock animatedBlock value="ticketscloud" />
                    </AnimateOrder>
                    <AnimatedBlock value="and before" />
                    <AnimatedBlock value="worked for" />
                    <WorkBlock animatedBlock value="megafon" noSpaceAfter />
                    <AnimatedBlock value=","/>
                    <WorkBlock animatedBlock value="webtelco" noSpaceAfter />
                    
                </AnimateOrder>                
            </h2>
        </div>
    );
}

export default AboutMeBlock;
