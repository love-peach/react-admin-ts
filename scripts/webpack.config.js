const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
console.log(process.env, 'process');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.tsx',
        vendor: [
            'react',
        ]
    },
    output: {
        path: path.resolve('./dist'),
        publicPath: '/',
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@src': path.resolve('./src'),
            '@assets': path.resolve('./src/assets'),
            '@components': path.resolve('./src/components'),
            '@constants': path.resolve('./src/constants'),
            '@interfaces': path.resolve('./src/interfaces'),
            '@models': path.resolve('./src/models'),
            '@pages': path.resolve('./src/pages'),
            '@routers': path.resolve('./src/routers'),
            '@utils': path.resolve('./src/utils'),
        }
    },
    devServer: {
        disableHostCheck: true,
        port: 3000,
        open: true,
        compress: true,
        hot: true,
        inline: true,
        overlay: {
            errors: true
        },
        // spa 应用，访问除首页外的页面，防止404？
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        isEnvProduction && new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[name].[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico',
            title: 'react-admin',
            filename: 'index.html',
            template: './public/index.html',
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'theme-color': '#4285f4'
            }
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            emitError: true,
            quiet: true,
            fix: true
        }),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve('./src'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isEnvDevelopment && 'style-loader',
                    isEnvProduction && MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ].filter(Boolean),
                sideEffects: true // tree shaking(代码优化技术) 阶段，将无用的代码进行去除
            },
            // {
            //     test: /\.(png|jpg|gif|jpeg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: 'img/[name].[ext]?v=[hash:6]'
            //     }
            // },
            // {
            //     test: /\.(eot|svg|ttf|woff)$/,
            //     loader: 'file-loader',
            //     options: {
            //         publicPath: '../',
            //         name: 'css/fonts/[name].[ext]'
            //     }
            // }
        ]
    },
}
