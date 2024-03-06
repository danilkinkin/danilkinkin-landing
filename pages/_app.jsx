import React from "react";
import Head from "next/head";
import localFont from "next/font/local";
import "./global-styles.css";
import "../constants/theme.css";

const manropeFont = localFont({ src: "../fonts/manrope.wght.ttf" });
const title = "Danil Зakhvatkin";
const description =
  "Hi, I’m Danil Зakhvatkin, I’m developing web applications, websites and other interesting things.";

function MyApp({ Component, pageProps }) {
  return (
    <main className={manropeFont.className}>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
        {/* Icons */}
        <link rel="icon" href="favicon.svg" />
        {/* Theme */}
        <meta
          name="theme-color"
          content="#FFFDFE"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#151113"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
