import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as Path from "path";
import * as Webpack from "webpack";
import * as ManifestPlugin from "webpack-manifest-plugin";
import { myWebpackConfig, myWebpackPaths } from "./my.webpack.config";

export default class ConfigProd {
    // Copy and compress images
    private imagesRule = {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: myWebpackConfig.includeImagePaths,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: myWebpackPaths.imagesDirectoryName + "/"
                }
            },
            {
                loader: "image-webpack-loader",
                options: {
                    gifsicle: {
                        interlaced: false
                    },
                    optipng: {
                        optimizationLevel: 7
                    },
                    pngquant: {
                        quality: "65-90",
                        speed: 4
                    },
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    }
                }
            }
        ]
    };

    // Compile Sass and Scss
    private scssSassRule = {
        test: /\.(scss|sass)$/i,
        include: myWebpackConfig.includeStylesPaths,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader",
                options: {
                    importLoader: 2,
                    sourceMap: true,
                    minimize: true || {
                        /*cssnano options*/
                        autoprefixer: false // Autoprefixer is already used in postcss cssnext. See postcss.config.js
                    }
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }
            ]
        })
    };

    // Compile Less
    private lessRule = {
        test: /\.less$/i,
        include: myWebpackConfig.includeStylesPaths,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader",
                options: {
                    importLoader: 2,
                    sourceMap: true,
                    minimize: true || {
                        /*cssnano options*/
                        autoprefixer: false // Autoprefixer is already used in postcss cssnext. See postcss.config.js
                    }
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            },
            {
                loader: "less-loader",
                options: {
                    sourceMap: true
                }
            }
            ]
        })
    };

    // Compile Css and PostCss
    private cssPcssRule = {
        test: /\.(css|pcss)$/i,
        include: myWebpackConfig.includeStylesPaths,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader",
                options: {
                    importLoader: 1,
                    sourceMap: true,
                    minimize: true || {
                        /*cssnano options*/
                        autoprefixer: false // Autoprefixer is already used in postcss cssnext. See postcss.config.js
                    }
                }
            }, {
                loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            }]
        })
    };

    private prodConfig = {
        module: {
            rules: [
                this.scssSassRule,
                this.lessRule,
                this.cssPcssRule,
                this.imagesRule
            ]
        },
        plugins: [
            new ExtractTextPlugin({ // Extracts css from chunks
                filename: "[name]/[name].css",
                allChunks: true
            })
        ]
    };

    constructor(public env: string | object) {}

    // Method to return config object
    public get config() {
        console.log("************************ PRODUCTION CONFIGURATION ************************");
        return this.prodConfig;
    }
}
