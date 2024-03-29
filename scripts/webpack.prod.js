const path = require('path');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');
const { PROJECT_PATH } = require('./constant');

const prodConfig = merge(common, {
    mode: 'production',
    devtool: false,
    target: 'browserslist',
    output: {
        path: path.resolve(PROJECT_PATH, './dist'),
        filename: 'js/[name].[contenthash:8].js',
        assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
        publicPath: '../',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: { pure_funcs: ['console.log'] },
                },
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
});

module.exports = prodConfig;
