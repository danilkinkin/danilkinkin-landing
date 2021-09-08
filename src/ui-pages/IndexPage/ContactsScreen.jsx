import React, { useState, useEffect } from 'react';
import getMyAge from '@/utils/getMyAge';
import { createUseStyles } from 'react-jss';
import Container from '@/ui-components/Container';
import theme from '@/theme';
import NextLink from '@/ui-components/NextLink';

const useStyles = createUseStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.text.primary,
    },
    header: {
        fontSize: 48,
        color: theme.palette.text.secondary,
    },
});

function ContactsScreen() {
    const classes = useStyles();

    return (
        <aside className={classes.root}>
            <Container>
                <h2 className={classes.header}>/contact with me</h2>
                <nav>
                    <li>
                        <NextLink>hello@danilkinkin.com</NextLink>
                    </li>
                    <li>
                        <NextLink>github</NextLink>
                    </li>
                    <li>
                        <NextLink>telegram</NextLink>
                    </li>
                    <li>
                        <NextLink>instagram</NextLink>
                    </li>
                    <li>
                        <NextLink>habr</NextLink>
                    </li>
                    <li>
                        <NextLink>hh</NextLink>
                    </li>
                </nav>
            </Container>
        </aside>
    );
}

export default ContactsScreen;
