import React, { useEffect, useRef } from "react";
import lottieStartJson from "@/assets/wave-start.lottie.json";
import lottieJson from "@/assets/wave.lottie.json";
import styles from "./Wave.module.scss";
import lottie from "lottie-web";

function Wave() {
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

    setTimeout(() => {
      startAnimation.play();
    }, 9000);

    startAnimation.addEventListener("complete", () => {
      startAnimation.destroy();
      loopAnimation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: lottieJson,
      });
    });

    return () => {
      startAnimation.destroy();
      loopAnimation?.destroy();
    };
  }, []);

  return <span ref={ref} className={styles.root}></span>;
}

export default Wave;
