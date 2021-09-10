import React from 'react';
import { createUseStyles } from 'react-jss';
import Container from '@/ui-components/Container';
import NextLink from '@/ui-components/NextLink';
import MailIcon from '@/icons/Mail';

const useStyles = createUseStyles({
    root: {
        position: 'fixed',
        bottom: 40,
        left: 0,
        right: 0,
        display: 'flex',
    },
    nav: {
        maxWidth: 'inherit',
    },
    mail: {
        marginLeft: 'auto',
    },
});

function Navigation({ children }) {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <nav className={classes.nav}>
                {children}
            </nav>
            <NextLink
                to="mailto:hello@danilkinkin.com"
                startIcon={(<MailIcon />)}
                className={classes.mail}
            >
                hello@danilkinkin.com
            </NextLink>
        </Container>
    );
}

export default Navigation;
