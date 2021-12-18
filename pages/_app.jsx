import React, { Fragment } from 'react';
// import '@/fonts/inject.css';
import styles from '../public/root-styles.css';
import Head from 'next/head';
import CssBaseline from '@/ui/CssBaseline';
import theme from '@/theme';
// import useMainStateStore from '@/utils/mainStateStore';

const title = 'Danil Zakhvatkin';
const description = 'Hi, I’m Danil Zakhvatkin, I’m developing web applications, websites and other interesting things.';

console.log('styles:', styles)

function MyApp({ Component, pageProps }) {
    // const { eventBus } = useMainStateStore();

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                {/* Icons */}
                <link rel="apple-touch-icon" sizes="180x180" href="https://danilkinkin.com/apple-touch-icon.png" />
                <link
                    rel="icon" type="image/png" sizes="32x32"
                    href="https://danilkinkin.com/favicon-32x32.png"
                />
                <link
                    rel="icon" type="image/png" sizes="16x16"
                    href="https://danilkinkin.com/favicon-16x16.png"
                />
                <link rel="manifest" href="https://danilkinkin.com/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="https://danilkinkin.com/safari-pinned-tab.svg"
                    color={theme.palette.primary}
                />
                <style>
                    {`
                        body {
                            margin: 0;
                            overflow: hidden auto;
                            font-family: Manrope, sans-serif;
                        }
                        @font-face {
                            font-family: "Manrope";
                            src: local("Manrope"), url("fonts/Manrope-VariableFont_wght.ttf") format("truetype");
                            font-weight: 200 800;
                            font-display: block;
                        }
                    `}
                </style>
                <meta name="msapplication-TileColor" content={theme.palette.primary} />
                <meta name="theme-color" content={theme.palette.primary} />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                {/* Meta */}
                {/* Primary Meta Tags */}
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://danilkinkin.com/" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://danilkinkin.com/large-share-image.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://danilkinkin.com/" />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content="https://danilkinkin.com/large-share-image.png" />
            </Head>
            <CssBaseline />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;
