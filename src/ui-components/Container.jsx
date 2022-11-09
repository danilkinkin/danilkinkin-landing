import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import theme, { createTransition } from '@/theme';

const useStyles = createUseStyles({
    root: {
        maxWidth: theme.breakpoints.desktop,
        width: '100%',
        margin: 'auto',
        padding: [0, 14 * theme.spacing],
        boxSizing: 'border-box',
        transition: createTransition(['padding'], theme.transitions.default),
    },
    [`@media (max-width: ${theme.breakpoints.mobile}px)`]: { root: { padding: [0, 3 * theme.spacing] } },
});

function Container({ children, className }) {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)}>{children}</div>
    );
}

export default Container;
