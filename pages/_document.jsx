import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';
// import jss, { SheetsRegistry } from 'jss';
// import theme from '@/theme';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content="#f00" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

/* MyDocument.getInitialProps = async (ctx) => {
    const sheets = new SheetsRegistry();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({ enhanceApp: (App) => (props) => sheets.collect(<App {...props} />) });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
}; */
