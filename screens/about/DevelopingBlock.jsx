import React, { useState, useEffect } from "react";
import { AnimatedBlock, AnimateOrder } from "./AboutMeBlock";
import styles from "./DevelopingBlock.module.scss";
import clsx from "clsx";

console.log(styles);

function DevelopingBlock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <span className={clsx(styles.container, show && styles.show)}>
      <span className={styles.wrapper}>
        <span className={styles.text}>developing</span>
        <span className={styles.backdropLeft} />
        <span className={styles.stubLeft} />
      </span>
      <span className={styles.wrapper}>
        <span className={styles.text}>web applications</span>
        <span className={styles.backdropRight} />
        <span className={styles.stubRight} />
      </span>
    </span>
  );
}

export default DevelopingBlock;
