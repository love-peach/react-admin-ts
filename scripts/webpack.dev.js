const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('./constant');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    target: 'web',
    output: {
        path: path.resolve(PROJECT_PATH, './dist'),
        filename: 'js/[name].js',
        publicPath: '/',
    },
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        stats: 'errors-only',
        clientLogLevel: 'none',
        compress: true,
        open: true,
        hot: true,
        noInfo: true,
        historyApiFallback: true,
        // historyApiFallback: {
        // 	index: path.join(PROJECT_PATH, './public/index.html')
        // }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
});
