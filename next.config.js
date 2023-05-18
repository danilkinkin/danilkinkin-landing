/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/* eslint-enable */

const plugins = [withBundleAnalyzer];
const config = plugins.reduce((acc, next) => next(acc), {
  webpack: (config, { dev, webpack }) => ({
    ...config,
    plugins: [...(config?.plugins || []), new webpack.DefinePlugin({ PRODUCTION_MODE: JSON.stringify(!dev) })],
    module: {
      ...(config?.module || {}),
      rules: [
        ...(config?.module?.rules || []),
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: /url/, // *.svg?url
          loader: 'next-image-loader',
          options: { assetPrefix: '' },
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] },
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false
                }
              ]
            }
          }
        },
        {
          test: /\.(png|gif|jpg|ico|glb)$/,
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            publicPath: '/_next/static/files',
            outputPath: 'static/files',
          },
        },
      ],
    },
  }),
});

module.exports = config;