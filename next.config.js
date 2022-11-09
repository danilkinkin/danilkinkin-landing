/* eslint-disable import/no-extraneous-dependencies */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
/* eslint-enable */

module.exports = withPlugins([withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })], {
    webpack: (config, { dev, webpack }) => ({
        ...config,
        plugins: [...(config?.plugins || []), new webpack.DefinePlugin({ PRODUCTION_MODE: JSON.stringify(!dev) })],
        module: {
            ...(config?.module || {}),
            rules: [
                ...(config?.module?.rules || []),
                {
                    test: /\.svg$/,
                    issuer: /\.(js|ts)x?$/,
                    loader: require.resolve('react-svg-loader'),
                    options: { svgo: { plugins: [{ removeViewBox: false }] } },
                },
                {
                    test: /\.(png|gif|jpg|ico)$/,
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
