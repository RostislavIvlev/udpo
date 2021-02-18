const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
};

module.exports = {
    entry: {
        main: './src/index.js',
        typescript: './src/index.ts'
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js'],
    },

    devtool: 'source-map',

    plugins: [
        new webpack.ProvidePlugin({
            '$':          'jquery',
            '_':          'lodash',
        }),
        new CopyPlugin({
            patterns: [
                {from: PATHS.src + '/images', to: `assets/images`},
                {from: PATHS.src + '/fonts', to: `assets/fonts`}
            ]
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader']
            },

            {
                test: /\.html$/,
                use: ['html-loader']
            },

            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "assets/images" 
                    }
                }
            },

            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, 

            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
        ]
    },
};