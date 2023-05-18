import React, { useEffect, useRef } from "react";
import { AnimatedBlock } from "./AboutMeBlock";
import styles from "./WorkBlock.module.scss";
import Link from "next/link";
import clsx from "clsx";
import ExternalOpenIcon from "@/icons/resources/external_open.svg?url";

const works = {
  ticketscloud: {
    title: "Ticketscloud",
    link: "https://ticketscloud.org",
  },
  megafon: {
    title: "MegaFon",
    link: "https://megafon.ru",
  },
  webtelco: {
    title: "Webtelco",
    link: "https://webtelco.net",
  },
};

function WorkBlock({ value, noSpaceAfter, ...props }) {
  const rootRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const rect = rootRef.current.getBoundingClientRect();
      arrowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      arrowRef.current.style.transformOrigin = `${e.clientX + 18}px ${
        e.clientY + 18
      }px`;

      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        arrowRef.current.style.scale = 0;
      } else {
        arrowRef.current.style.scale = 1;
      }
    };

    addEventListener("mousemove", onMouseMove);

    return () => {
      removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <Link
      ref={rootRef}
      className={clsx(styles.link, !noSpaceAfter && styles.spaceAfter)}
      target="_blank"
      href={works[value].link}
    >
      <div
        ref={arrowRef}
        className={styles.arrow}
        style={{ "--mask-link": `url(${ExternalOpenIcon.src})` }}
      />
      <AnimatedBlock
        className={clsx(
          styles.animatedBlock,
          styles[value]
        )}
        value={works[value].title}
        {...props}
      />
    </Link>
  );
}

export default WorkBlock;
