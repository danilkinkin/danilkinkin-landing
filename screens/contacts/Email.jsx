import React, { useEffect } from "react";
import styles from "./Email.module.scss";
import Link from "next/link";
import clsx from "clsx";
import MailIcon from "@/icons/Mail";
import MailImage from "@/icons/resources/mail.svg?url";
import { animated, useSpring } from "@react-spring/web";
import { useMediaQuery } from "react-responsive";

function Email() {
  const rootRef = React.useRef(null);
  const arrowRef = React.useRef(null);
  const [hover, setHover] = React.useState(false);
  const [sizes, setSizes] = React.useState({
    iconWidth: 40,
    iconHeight: 26,
    containerPaddingLeft: 54,
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 870px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1070px)" });
  const [cursorPositionSpring, cursorPositionApi] = useSpring(
    () => ({
      x: 0,
      y: 0,
      config: {
        mass: 0.3,
        friction: 10,
        tension: 200,
      },
    }),
    []
  );
  const [textShiftSpring, textShiftApi] = useSpring(
    () => ({
      x: 0,
      config: {
        mass: 0.4,
        friction: 10,
        tension: 200,
      },
    }),
    []
  );

  useEffect(() => {
    let sizes = {};
    switch (true) {
      case isSmallScreen:
        sizes = {
          iconWidth: 27,
          iconHeight: 18,
          containerPaddingLeft: 36,
        };
        break;
      case isMediumScreen:
        sizes = {
          iconWidth: 32,
          iconHeight: 22,
          containerPaddingLeft: 42,
        };
        break;
      default:
        sizes = {
          iconWidth: 40,
          iconHeight: 26,
          containerPaddingLeft: 54,
        };
        break;
    }

    setSizes(sizes);

    if (!hover) {
      const rect = rootRef.current.getBoundingClientRect();
      const x = sizes.iconWidth / 2;
      const y = rect.height / 2;
      cursorPositionApi.start({
        x,
        y: y + sizes.iconHeight * 0.1,
      });
      textShiftApi.start({
        x: 0,
      });
    }
  }, [isSmallScreen, isMediumScreen, hover]);

  useEffect(() => {
    let timer = null;
    const onMouseMove = (e) => {
      const rect = rootRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      clearTimeout(timer);

      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        x = sizes.iconWidth / 2;
        y = rect.height / 2;
        setHover(false);
        textShiftApi.start({
          x: 0,
        });
        cursorPositionApi.start({
          x,
          y: y + sizes.iconHeight * 0.1,
          config: {
            mass: 0.3,
            friction: 10,
            tension: 200,
          },
        });
      } else {
        setHover(true);
        textShiftApi.start({
          x: -sizes.containerPaddingLeft / 2,
        });
        cursorPositionApi.start({
          x,
          y: y + sizes.iconHeight * 0.1,
        });

        timer = setTimeout(() => {
          cursorPositionApi.start({
            config: {
              mass: 0,
              friction: 10,
              tension: 200,
            },
          });
        }, 400);
      }
    };

    addEventListener("mousemove", onMouseMove);

    return () => {
      removeEventListener("mousemove", onMouseMove);
    };
  }, [sizes]);

  return (
    <Link
      ref={rootRef}
      className={clsx(styles.email)}
      target="_blank"
      href="mailto:hello@danilkinkin.com"
    >
      <animated.div
        ref={arrowRef}
        style={cursorPositionSpring}
        className={clsx(styles.arrowContainer, hover && styles.arrowActive)}
      >
        <div
          className={styles.arrowCursor}
          style={{ "--mask-link": `url(${MailImage.src})` }}
        />
        <MailIcon className={styles.arrowIdle} />
      </animated.div>
      <animated.span className={styles.text} style={textShiftSpring}>
        hello@danilkinkin.com
      </animated.span>
    </Link>
  );
}

export default Email;
