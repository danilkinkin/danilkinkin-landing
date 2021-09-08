import React from 'react';
import { createUseStyles } from 'react-jss';
import theme from '@/theme';
import NextLink from '@/ui-components/NextLink';

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
        <NextLink to={to || '#'} className={classes.root}>
            {title}
        </NextLink>
    );
}

export default NavigationItem;
