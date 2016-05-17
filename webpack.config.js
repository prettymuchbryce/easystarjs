var webpack = require('webpack');
var config = require('./package.json');

var minify = process.argv.indexOf('--minify') !== -1;

var filename = 'easystar-' + config.version
if (minify) {
    filename += '.min.js';
} else {
    filename += '.js';
}

module.exports = {
    entry: './src/easystar.js',
    output: {
        path: './bin',
        filename: filename,
        libraryTarget: "var",
        library: "EasyStar"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loader: 'babel-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: minify
        })
    ]
};
