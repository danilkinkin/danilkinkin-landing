import React from 'react';
import { createUseStyles } from 'react-jss';
import theme from '@/theme';
import clsx from 'clsx';

const useStyles = createUseStyles({
    root: {
        maxWidth: theme.breakpoints.desktop,
        width: '100%',
        margin: 'auto',
        padding: [0, 14 * theme.spacing],
        boxSizing: 'border-box',
    },
});

function Container({ children, className }) {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)}>{children}</div>
    );
}

export default Container;
