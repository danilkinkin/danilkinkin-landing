import React, { useEffect, useRef } from "react";
import lottieStartJson from "@/assets/pen-circle-start.lottie.json";
import lottieJson from "@/assets/pen-circle.lottie.json";
import styles from "./Nickname.module.scss";
import lottie from "lottie-web";
import Link from "next/link";
import clsx from "clsx";
import { AnimatedBlock } from "./AboutMeBlock";
import ExternalOpenIcon from "@/icons/resources/external_open.svg?url";

function Nickname({ delay = 0 }) {
  const ref = useRef(null);
  const rootRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const startAnimation = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: lottieStartJson,
    });
    let loopAnimation = null;

    startAnimation.setSubframe(false);

    setTimeout(() => {
      startAnimation.play();
    }, delay + 300);

    startAnimation.addEventListener("complete", () => {
      startAnimation.destroy();
      loopAnimation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: lottieJson,
      });

      loopAnimation.setSubframe(false);
    });

    return () => {
      startAnimation.destroy();
      loopAnimation?.destroy();
    };
  }, []);

  useEffect(() => {
    let isTouch = false;

    const onMouseMove = (e) => {
      if (isTouch) return;
      const rect = rootRef.current.getBoundingClientRect();
      const contactsLinkRect = document
        .getElementById("contacts_link")
        .getBoundingClientRect();

      const contactsLinkCenter = {
        x: contactsLinkRect.left + contactsLinkRect.width / 2,
        y: contactsLinkRect.top + contactsLinkRect.height / 2,
      };

      // Get angle in deg for rotate face arrow to contactsLinkCenter

      const angle =
        (Math.atan2(
          e.clientY - contactsLinkCenter.y,
          e.clientX - contactsLinkCenter.x,
        ) *
          180) /
        Math.PI;

      arrowRef.current.style.transform = `rotate(${angle - 135}deg) translate(${e.clientX}px, ${e.clientY}px)`;
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

    const handlePointerDown = (e) => {
      isTouch = event.pointerType === "touch";
    };

    addEventListener("pointerdown", handlePointerDown);
    addEventListener("mousemove", onMouseMove);

    return () => {
      removeEventListener("pointerdown", handlePointerDown);
      removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <Link ref={rootRef} className={clsx(styles.link)} href={"/contacts"}>
      <div
        ref={arrowRef}
        className={styles.arrow}
        style={{ "--mask-link": `url(${ExternalOpenIcon.src})` }}
      />
      <AnimatedBlock
        delay={delay}
        className={styles.text}
        value="@danilkinkin"
        noSpaceAfter
      />
      <span ref={ref} className={styles.pen} />
    </Link>
  );
}

export default Nickname;
