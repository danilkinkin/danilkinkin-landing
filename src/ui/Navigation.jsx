import React from 'react';
import { createUseStyles } from 'react-jss';
import Container from '@/ui-components/Container';

const useStyles = createUseStyles({
    root: {
        position: 'fixed',
        bottom: 40,
        maxWidth: 'inherit',
    },
});

function Navigation({ children }) {
    const classes = useStyles();

    return (
        <Container>
            <nav className={classes.root}>
                {children}
            </nav>
        </Container>
    );
}

export default Navigation;
