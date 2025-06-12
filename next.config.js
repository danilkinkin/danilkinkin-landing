/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
/* eslint-enable */

const plugins = [withBundleAnalyzer];
const config = plugins.reduce((acc, next) => next(acc), {
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

    config.redirects = async () => [
      {
        source: "/resume-ats",
        destination:
          "https://drive.google.com/file/d/17JYH-FtwQMoYezTYl9PK151DP64ucYsQ/view?usp=sharing",
        permanent: true,
      },
      {
        source: "/resume-styled",
        destination:
          "https://drive.google.com/file/d/1J0q54KJWDlUY_41dx0yKkp9_cOkSXaEE/view?usp=sharing",
        permanent: true,
      },
    ];

    return config;
  },
});

module.exports = config;
