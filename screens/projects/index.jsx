import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Header from '@/components/Header';
import Container from '@/components/Container';
import styles from './Projects.module.css';
import Link from "next/link";
import MailIcon from '@/icons/Mail';
import ExternalOpenIcon from '@/icons/ExternalOpen';
import { useSpring, animated, to as interpolate } from '@react-spring/web';

const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  })
  const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
  

function ProjectsPage() {
    const router = useRouter();
    const [path, setPath] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const props = useSpring({
        ...to(0),
        from: from(0),
      });

    return (
        <Container align="left" className={styles.contacts}>
            prijects

            <animated.div className={styles.deck}  style={{ x: props.x, y: props.y }}>
                <animated.div
                    style={{
                        transform: interpolate([props.rot, props.scale], trans),
                        backgroundColor: `#fff`,
                    }}
                    className={styles.card}
                />
            </animated.div>
        </Container>
    );
}

export default ProjectsPage;
