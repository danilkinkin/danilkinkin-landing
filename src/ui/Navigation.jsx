import React, { Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import Container from '@/ui-components/Container';
import NextLink from '@/ui-components/NextLink';
import MailIcon from '@/icons/Mail';
import MediaQuery from 'react-responsive'
import clsx from 'clsx';
import theme from '@/theme';

const useStyles = createUseStyles({
    root: {
        position: 'fixed',
        bottom: 40,
        left: 0,
        right: 0,
        display: 'flex',
    },
    rootTop: {
        top: 40,
        bottom: 'auto',
    },
    nav: { maxWidth: 'inherit' },
    mail: { marginLeft: 'auto' },
});

function Navigation({ children }) {
    const classes = useStyles();

    return (
        <Fragment>
            <Container className={classes.root}>
                <nav className={classes.nav}>
                    {children}
                </nav>
                <MediaQuery minWidth={theme.breakpoints.mobile + 1}>
                    <NextLink
                        to="mailto:hello@danilkinkin.com"
                        startIcon={(<MailIcon />)}
                        className={classes.mail}
                    >
                        hello@danilkinkin.com
                    </NextLink>
                </MediaQuery>
            </Container>
            <MediaQuery maxWidth={theme.breakpoints.mobile}>
                <Container className={clsx(classes.root, classes.rootTop)}>
                    <NextLink
                        to="mailto:hello@danilkinkin.com"
                        startIcon={(<MailIcon />)}
                        className={classes.mail}
                    >
                        hello@danilkinkin.com
                    </NextLink>
                </Container>
            </MediaQuery>
        </Fragment>
    );
}

export default Navigation;
