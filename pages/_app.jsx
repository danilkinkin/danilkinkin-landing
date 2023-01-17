import React from 'react';
import Head from 'next/head';
import theme, { computeVars } from '@/constants/theme';
import localFont from '@next/font/local'
import './global-styles.css';

const manropeFont = localFont({ src: '../fonts/manrope.wght.ttf' })
const title = 'Danil Зakhvatkin';
const description = 'Hi, I’m Danil Зakhvatkin, I’m developing web applications, websites and other interesting things.';

function MyApp({ Component, pageProps }) {
    return (
        <main className={manropeFont.className}>
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
                <style dangerouslySetInnerHTML={{ __html: computeVars() }} ></style>
            </Head>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;
