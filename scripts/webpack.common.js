const path = require('path');

const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { PROJECT_PATH } = require('./constant');
const { isDevelopment, isProduction } = require('./env');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// import path from 'path';

// import webpack from 'webpack';
// import WebpackBar from 'webpackbar';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import CopyPlugin from 'copy-webpack-plugin';

// import { PROJECT_PATH } from './constant.js';
// import { isDevelopment, isProduction } from './env.js';

const getCssLoaders = () => {
    const cssLoaders = [
        isDevelopment && 'style-loader',
        isProduction && MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                // modules: {
                //     localIdentName: '[local]--[hash:base64:5]',
                // },
                sourceMap: isDevelopment,
            },
        },
    ].filter(Boolean);

    isProduction &&
        cssLoaders.push({
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        isProduction && [
                            'postcss-preset-env',
                            {
                                autoprefixer: {
                                    grid: true,
                                },
                            },
                        ],
                    ],
                },
            },
        });

    return cssLoaders;
};

const commonConfig = {
    cache: true,
    context: PROJECT_PATH,
    entry: {
        app: path.resolve(PROJECT_PATH, './src/index.tsx'),
    },
    cache: true,
    // cache: {
    //     type: 'filesystem',
    //     buildDependencies: {
    //         config: [__filename],
    //     },
    // },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(PROJECT_PATH, './src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [...getCssLoaders()],
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDevelopment,
                            lessOptions: {
                                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                                // modifyVars: getThemeVariables({
                                //     dark: true, // 开启暗黑模式
                                //     compact: true, // 开启紧凑模式
                                // }),
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/,
                type: 'asset/resource',
            },
        ],
    },
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // },
    plugins: [
        process.env.npm_config_report && new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './public/index.html'),
            favicon: path.resolve(PROJECT_PATH, './public/favicon.ico'),
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@17.0.1/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                },
                {
                    module: 'react-router',
                    entry: 'https://unpkg.com/react-router@5.2.0/umd/react-router.min.js',
                    global: 'ReactRouter',
                },
                // {
                //     module: 'react-router-dom',
                //     entry: 'https://unpkg.com/react-router-dom@5.2.0/umd/react-router-dom.min.js',
                //     global: 'ReactRouterDOM',
                // },
                {
                    module: 'antd',
                    entry: 'https://unpkg.com/antd@4.16.7/dist/antd.min.js',
                    global: 'antd',
                },
                {
                    module: 'antd',
                    entry: 'https://unpkg.com/antd@4.16.7/dist/antd.min.css',
                },
                // {
                //     module: 'antd',
                //     entry: 'https://unpkg.com/@ant-design/icons@4.6.2/dist/index.umd.js',
                //     global: '@ant-design/icons',
                // },
                {
                    module: 'axios',
                    entry: 'https://unpkg.com/axios@0.21.1/dist/axios.min.js',
                    global: 'axios',
                },
            ],
        }),
        new CleanWebpackPlugin(),
        new WebpackBar({
            name: '开始你的表演！！！',
            color: '#52c41a',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: 'public',
                    from: '*',
                    to: path.resolve(PROJECT_PATH, './dist/public'),
                    toType: 'dir',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
    ].filter(Boolean),
};

module.exports = commonConfig;
