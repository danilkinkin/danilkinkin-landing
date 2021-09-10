import React, { forwardRef } from 'react';
import Link from 'next/link';
import theme from '@/theme';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles({
    link: {
        fontSize: 18,
        textDecoration: 'unset',
        fontWeight: 550,
        color: theme.palette.text.primary,
        '&:hover': { color: theme.palette.primary },
    },
    startIcon: {
        marginRight: theme.spacing,
        '& svg': { verticalAlign: 'middle' },
    },
    endIcon: {
        marginLeft: theme.spacing,
        '& svg': { verticalAlign: 'middle' },
    },
});

const LinkItem = forwardRef(({ children, className, ...props }, ref) => {
    const classes = useStyles();

    return (<a ref={ref} className={clsx(classes.link, className)} {...props}>{children}</a>);
});

function NextLink({
    children, startIcon, endIcon, to, ...props
}) {
    const classes = useStyles();

    return (
        <Link href={to || '#'} passHref scroll={false}>
            <LinkItem {...props}>
                {startIcon && (
                    <span className={classes.startIcon}>{startIcon}</span>
                )}
                {children}
                {endIcon && (
                    <span className={classes.endIcon}>{endIcon}</span>
                )}
            </LinkItem>
        </Link>
    );
}

export default NextLink;
