const path = require("path");
const fs = require("fs");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const config = require('./package.json');

const isProductionBuild = process.argv.indexOf('--production') !== -1;
const isBuildMinified = process.argv.indexOf('--minify') !== -1;
const filename = `easystar-${config.version}${isBuildMinified ? '.min' : ''}.js`

const getLicense = () => {
    const licenseText = fs.readFileSync(path.resolve(__dirname, "LICENSE"), 'utf8');
    return `@license\n${licenseText}`;
}

const terserSettings = {
    terserOptions: {
        output: {
            comments: "all"
        },
        mangle: false,
    },
    extractComments: false,
}

if (isBuildMinified) {
    terserSettings.minify = (file, sourceMap) => {
        // https://github.com/mishoo/UglifyJS2#minify-options
        const uglifyJsOptions = {
            warnings: false,
            output: {
                comments: "some"
            }
        };

        if (sourceMap) {
            uglifyJsOptions.sourceMap = {
                content: sourceMap,
            };
        }

        return require('uglify-js').minify(file, uglifyJsOptions);
    };
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
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(terserSettings)],
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
    ]
};
