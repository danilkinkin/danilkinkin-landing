import { jss } from 'react-jss';
import jssPluginGlobal from 'jss-plugin-global';
import theme from '@/theme';

const styles = {
    '@global': {
        body: {
            margin: 0,
            fontFamily: 'Manrope, sans-serif',
        },
        '::selection': {
            background: theme.palette.primary
        },
    },
};

function CssBaseline() {
    jss.use(jssPluginGlobal());
    jss.createStyleSheet(styles).attach();

    return null;
}

export default CssBaseline;
