const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
};
const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));



module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: `${PATHS.assets}js/[name].[contentHash].bundle.js`,
        path: PATHS.dist,
        publicPath: '/'
    },

    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: `${PATHS.assets}js/[name].bundle.js`,
            path: PATHS.dist,
            publicPath: '/',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),

        new CleanWebpackPlugin(),
        
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contentHash].css`,
        }),

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        })),
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    }
});