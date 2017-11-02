import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as LiveReloadPlugin from "webpack-livereload-plugin";
import * as Path from "path";
import * as Webpack from "webpack";
import { myWebpackConfig, myWebpackPaths } from "./my.webpack.config";

export default class ConfigDev {
    // Copy and compress images
    private imageRule = {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: myWebpackConfig.includeImagePaths,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: myWebpackPaths.imagesDirectoryName + "/"
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
                    minimize: false
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
    private lessRule =  {
        test: /\.less$/i,
        include: myWebpackConfig.includeStylesPaths,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader",
                options: {
                    importLoader: 2,
                    sourceMap: true,
                    minimize: false
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
                    minimize: false
                }
            }, {
                loader: "postcss-loader",
                options: {
                    sourceMap: true
                }
            }]
        })
    };

    private devconfig = {
        module: {
            rules: [
                this.scssSassRule,
                this.lessRule,
                this.cssPcssRule,
                this.imageRule
            ]
        },
        plugins: [
            // Extracts css from chunks
            new ExtractTextPlugin({
              filename: "[name]/[name].css",
              allChunks: true
            }),
            // LiveReload Server
            new LiveReloadPlugin(myWebpackConfig.livereload)
        ]
    };

    constructor(public env: string | object) {}
    public get config() {
        console.log("************************ DEVELOPMENT CONFIGURATION ************************");
        return this.devconfig;
    }
}
