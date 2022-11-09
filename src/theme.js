const theme = {
    palette: {
        primary: '#FF006B',
        secondary: '#0066ff',
        text: {
            primary: '#1E1E1E',
            secondary: '#bbbbbb',
        },
    },
    breakpoints: {
        desktop: 1850,
        mobile: 800,
        smallMobile: 340,
    },
    spacing: 6,
    transitions: {
        default: '0.3s ease',
        enter: '0.6s cubic-bezier(0, 1, 0.18, 1)',
    },
};

export default theme;

export const createTransition = (applyItems, transition) => `${applyItems.join(', ')} ${transition}`;

export const mergeTransitions = (...transitions) => transitions.join(', ');
