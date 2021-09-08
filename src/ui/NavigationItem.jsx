import React from 'react';
import { createUseStyles } from 'react-jss';
import theme from '@/theme';

const useStyles = createUseStyles({
    root: {
        fontSize: 18,
        width: 200,
        display: 'inline-block',
        fontWeight: 550,
        color: theme.palette.text.primary,
        textDecoration: 'unset',
    },
});

function NavigationItem({ title, to }) {
    const classes = useStyles();

    return (
        <a href={to || '#'} className={classes.root}>
            {title}
        </a>
    );
}

export default NavigationItem;
