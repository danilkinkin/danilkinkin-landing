import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';
import { JssProvider, SheetsRegistry, createGenerateId } from 'react-jss';

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

MyDocument.getInitialProps = async (ctx) => {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => function EnhanceApp(props) {
            return (
                <JssProvider registry={registry} generateId={generateId}>
                    <App {...props} />
                </JssProvider>
            );
        },
    });

    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: (
            <React.Fragment>
                {initialProps.styles}
                <style id="server-side-styles">{registry.toString()}</style>
            </React.Fragment>
        ),
    };
};
