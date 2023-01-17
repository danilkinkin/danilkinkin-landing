import React from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss'

function Container({ children, className, align }) {
    return (
        <main className={clsx(styles.root, styles[`align-${align}`], className)}>{children}</main>
    );
}

export default Container;
