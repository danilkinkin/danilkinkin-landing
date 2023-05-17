import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => function EnhanceApp(props) {
            return (
                <App {...props} />
            );
        },
    });

    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: (
            <React.Fragment>
                {initialProps.styles}
            </React.Fragment>
        ),
    };
};
