/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/* eslint-enable */

const RESUME_ATS_FRIENDLY_URL =
  "https://drive.google.com/file/d/15z4qHgQ41hwYfljUCQxCiuG1dSL779MH/view?usp=sharing";
const RESUME_ATS_FRIENDLY_SHORT_URL =
  "https://drive.google.com/file/d/1gAgs74QH030RaLRurZwlUQEC7G8l3G42/view?usp=sharing";
const RESUME_SHINY_URL =
  "https://drive.google.com/file/d/1u6WDikDRXPdRHu8KsuvwcXqs6C3EDTR7/view?usp=sharing";

const plugins = [withBundleAnalyzer];
const config = plugins.reduce((acc, next) => next(acc), {
  async redirects() {
    return [
      // Default
      {
        source: "/cv",
        destination: RESUME_ATS_FRIENDLY_URL,
        permanent: true,
      },
      {
        source: "/resume",
        destination: RESUME_ATS_FRIENDLY_URL,
        permanent: true,
      },
      // Shortened
      {
        source: "/cv-short",
        destination: RESUME_ATS_FRIENDLY_SHORT_URL,
        permanent: true,
      },
      {
        source: "/resume-short",
        destination: RESUME_ATS_FRIENDLY_SHORT_URL,
        permanent: true,
      },
      // Shiny version
      {
        source: "/cv-shiny",
        destination: RESUME_SHINY_URL,
        permanent: true,
      },
      {
        source: "/resume-shiny",
        destination: RESUME_SHINY_URL,
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({ PRODUCTION_MODE: JSON.stringify(!dev) }),
    );

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, // *.svg?url
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      loader: "@svgr/webpack",
      options: {
        svgoConfig: {
          plugins: [],
        },
      },
    });

    config.module.rules.push({
      test: /\.(png|gif|jpg|ico|glb)$/,
      loader: "file-loader",
      options: {
        name: "[name]_[hash].[ext]",
        publicPath: "/_next/static/files",
        outputPath: "static/files",
      },
    });

    return config;
  },
});

module.exports = config;
