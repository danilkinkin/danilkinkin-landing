import React from 'react';
import { createUseStyles } from 'react-jss';
import Container from '@/ui-components/Container';
import theme from '@/theme';
import NextLink from '@/ui-components/NextLink';
import ExternalOpenIcon from '@/icons/ExternalOpen';
import MailIcon from '@/icons/Mail';

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
        margin: 0,
        marginBottom: theme.spacing,
    },
    link: {
        listStyle: 'none',
        padding: [2, 0],

    },
    icon: { marginLeft: theme.spacing },
});

function LinkService({ name, href }) {
    const classes = useStyles();

    return (
        <li className={classes.link}>
            <NextLink
                to={href}
                target="_blank"
                endIcon={(<ExternalOpenIcon />)}
            >
                {name}
            </NextLink>
        </li>
    );
}

function ContactsScreen() {
    const classes = useStyles();

    return (
        <aside className={classes.root}>
            <Container>
                <h2 className={classes.header}>/contact with me</h2>
                <nav>
                    <li className={classes.link}>
                        <NextLink
                            to="mailto:hello@danilkinkin.com"
                            endIcon={(<MailIcon />)}
                        >
                            hello@danilkinkin.com
                        </NextLink>
                    </li>
                    <LinkService name="github" href="https://github.com/danilkinkin" />
                    <LinkService name="telegram" href="https://t.me/danilkinkin" />
                    <LinkService name="instagram" href="https://www.instagram.com/danilkinkin/" />
                    <LinkService name="habr" href="https://habr.com/ru/users/danilkinkin/" />
                    <LinkService name="hh" href="https://samara.hh.ru/resume/06760663ff05853e470039ed1f414d56723455" />
                </nav>
            </Container>
        </aside>
    );
}

export default ContactsScreen;
