import { jss } from 'react-jss';
import jssPluginGlobal from 'jss-plugin-global';
import theme from '@/theme';
import React from 'react';
import Head from 'next/head';

const styles = {
    '@global': {
        body: {
            margin: 0,
            fontFamily: 'Manrope, sans-serif',
            overflow: 'hidden auto',
        },
        '::selection': { background: theme.palette.primary },
        '@font-face': {
            fontFamily: "Manrope",
            src: 'local("Manrope"), url("fonts/Manrope-VariableFont_wght.ttf") format("truetype")',
            fontWeight: '200 800',
            fontDisplay: 'block',
        }
    },
};

function CssBaseline() {
    jss.use(jssPluginGlobal());
    const sheet = jss.createStyleSheet(styles);

    return (
        <Head>
            <style
                id="server-side-styles-baseline"
                dangerouslySetInnerHTML={{ __html: sheet.toString() }}
            />
        </Head>
    );
}

export default CssBaseline;
