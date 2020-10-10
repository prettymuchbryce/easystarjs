const path = require("path");
const fs = require("fs");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');
const config = require('./package.json');

const isProductionBuild = process.argv.indexOf('--production') !== -1;
const filename = `easystar-${config.version}.min.js`

const getLicense = () => {
    return fs.readFileSync(path.resolve(__dirname, "LICENSE"), 'utf8');
}

module.exports = {
    target: "web",
    mode: isProductionBuild ? "production" : "development",
    entry: './src/easystar.js',
    devtool: isProductionBuild ? false : 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "bin"),
        filename: filename,
        libraryTarget: "var",
        library: "EasyStar",
        publicPath: "/bin/"
    },
    resolve: {
        extensions: ['.js'],
        modules: ["node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: getLicense()
        }),
        new UglifyJSPlugin({
            sourceMap: !isProductionBuild,
            uglifyOptions: {
                ecma: 6,
                warnings: false,
                output: {
                    comments: true,
                },
            }
        })
    ]
};
