import React, { Fragment } from 'react';
import '@/fonts/inject.css';
import Head from 'next/head';
import CssBaseline from '@/ui/CssBaseline';
// import useMainStateStore from '@/utils/mainStateStore';

const title = 'Danil Zakhvatkin';
const description = 'Hi, I’m Danil Zakhvatkin, I’m developing web applications, websites and other interesting things.';

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
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link
                    rel="icon" type="image/png" sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon" type="image/png" sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0000ff" />
                <meta name="msapplication-TileColor" content="#0000ff" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                {/* Meta */}
                {/* Primary Meta Tags */}
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="./" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="/large-share-image.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="./" />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content="/large-share-image.png" />
            </Head>
            <CssBaseline />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;
