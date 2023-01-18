import React from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss'

function Container({ gap = '160px', gapMobile = '18px', children, className, align }) {
    return (
        <section 
            className={clsx(styles.root, styles[`align-${align}`], className)} 
            style={{ ['--gap-desktop']: gap, ['--gap-mobile']: gapMobile }}
        >
            {children}
        </section>
    );
}

export default Container;
