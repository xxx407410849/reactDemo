const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
const extractLess = new ExtractTextPlugin({
    filename: "stylesheets/[name].css",
    ignoreOrder : true
});
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './package.jsx'),
    devtool: 'inline-source-map',
    devServer: {
        port: 8086
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js",
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(css|less)$/,
                use: extractLess.extract({
                    fallback : 'style-loader',
                    use: [
                        {loader : 'css-loader' , options : { importLoaders: 2 , autoprefixer : false}},
                        {loader: 'postcss-loader'},
                        {loader : 'less-loader' , options : { relativeUrls : true}}
                    ]

                })
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'font/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            'syntax-dynamic-import'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        extractLess,
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: 'view/react_demo.html'
        })
    ]
}