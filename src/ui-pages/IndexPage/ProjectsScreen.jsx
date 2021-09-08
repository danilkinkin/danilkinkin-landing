import React, { useState, useEffect } from 'react';
import getMyAge from '@/utils/getMyAge';
import { createUseStyles } from 'react-jss';
import Container from '@/ui-components/Container';
import theme from '@/theme';

const useStyles = createUseStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.text.primary,
    },
});

function ProjectsScreen() {
    const classes = useStyles();

    return (
        <aside className={classes.root}>
            <Container>
                <h2>/my projects</h2>
            </Container>
        </aside>
    );
}

export default ProjectsScreen;
