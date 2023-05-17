import React, { useEffect, useRef } from "react";
import lottieStartJson from "@/assets/pen-circle-start.lottie.json";
import lottieJson from "@/assets/pen-circle.lottie.json";
import styles from "./Nickname.module.scss";
import lottie from "lottie-web";
import { AnimatedBlock } from "./AboutMeBlock";

function Nickname({ delay = 0 }) {
  const ref = useRef(null);

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

  return (
    <span className={styles.root}>
      <AnimatedBlock delay={delay} className={styles.text} value="@danilkinkin" noSpaceAfter />
      <span ref={ref} className={styles.pen} />
    </span>
  );
}

export default Nickname;
