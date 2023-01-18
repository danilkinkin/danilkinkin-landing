const theme = {
    palette: {
        container: '#FFFDFE',
        onContainer: '#3F0015',
        onContainerVariant: '#3F001540',
        primary: '#FF006B',
        secondary: '#0066ff',
        text: {
            primary: '#1E1E1E',
            secondary: '#bbbbbb',
        },
    },
    breakpoints: {
        desktop: '1850px',
        mobile: '800px',
        smallMobile: '340px',
    },
    spacing: '6px',
    transitions: {
        default: '0.3s ease',
        enter: '0.6s cubic-bezier(0, 1, 0.18, 1)',
    },
};

export default theme;

export const createTransition = (applyItems, transition) => `${applyItems.join(', ')} ${transition}`;

export const mergeTransitions = (...transitions) => transitions.join(', ');

function flat(structure) {
    return Object.keys(structure).flatMap((group) => {
        if (typeof structure[group] === 'object') {
            const val = flat(structure[group]).map((value) => {
                if (Array.isArray(value)) return value.map((subValue) => `${group}-${subValue}`);

                return `${group}-${value}`;
            });

            return val; 
        }

        return `${group}: ${structure[group]};`
    });
}

export const computeVars = () => {
    const vars = flat(theme).map((value) => `--${value}`);
    const scssVars = flat(theme).map((value) => `$${value}`);

    return `:root { ${vars.join('')} ${scssVars.join('')} }`
};