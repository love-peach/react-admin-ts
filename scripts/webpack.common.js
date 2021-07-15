const path = require('path');
const WebpackBar = require('webpackbar');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { PROJECT_PATH } = require('./constant');
const { isDevelopment, isProduction } = require('./env');

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

module.exports = {
    entry: {
        app: path.resolve(PROJECT_PATH, './src/index.tsx'),
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@src': path.resolve(PROJECT_PATH, './src'),
            '@assets': path.resolve(PROJECT_PATH, './src/assets'),
            '@components': path.resolve(PROJECT_PATH, './src/components'),
            '@constants': path.resolve(PROJECT_PATH, './src/constants'),
            '@interfaces': path.resolve(PROJECT_PATH, './src/interfaces'),
            '@models': path.resolve(PROJECT_PATH, './src/models'),
            '@pages': path.resolve(PROJECT_PATH, './src/pages'),
            '@routers': path.resolve(PROJECT_PATH, './src/routers'),
            '@utils': path.resolve(PROJECT_PATH, './src/utils'),
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './public/index.html'),
            favicon: path.resolve(PROJECT_PATH, './public/favicon.ico'),
        }),
        new CleanWebpackPlugin(),
        new WebpackBar({
            name: 'Link Startou!!!',
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
    ],
};
