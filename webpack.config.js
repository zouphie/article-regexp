const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    devServer: {
        historyApiFallback: true,
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },

    module: {
        rules: [
            // use babel for all js files
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            // use handlebars for templating
            {
                test: /\.(hbs|handlebars)$/,
                loader: "handlebars-loader",
                options: {
                    inlineRequires: /\/assets\/(:?images|audio|video)\//ig,
                    partialDirs: [path.join(__dirname, './src/partials/components')],
                },
            },
            // convert SASS to CSS, then minify and autoprefix
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader, // extract CSS into separate file
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
                        options: {
                            sourceMap: false,
                            // prependData: '@import "src/styles/_variables.scss";',
                            sassOptions: {
                                importer: globImporter(),
                            },
                        }
                    },
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: ['./src/styles/_variables.scss', './src/styles/_mixins.scss'],
                        }
                    }
                ]
            },
            // compress and include images
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: 'file-loader',
                options:
                {
                    name: '[name].[ext]',
                    outputPath: 'images',
                },
            }
        ]
    },

    plugins: [
        // clean dist folder before each build
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            title: "Article Search",
            inject: true,
            template: "./src/index.hbs",
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            }
        }),
    ]
}