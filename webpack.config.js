const path = require('path');
const extractText = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new extractText({
   filename: '[name].css',
   disable: process.env.NODE_ENV === 'dev'
});

console.log(process.env.NODE_ENV)

module.exports = {
    entry: {
        dist: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.scss']
    },
    plugins: [
        extractSass,
        new htmlWebpackPlugin({
            title: 'to-do-app',
            template: './src/index.html',
            inject: true
        })
    ],
    devtool: 'cheap-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: path.join(__dirname, 'dist'),
        compress: true, // gzip
        disableHostCheck: true,
    }
};