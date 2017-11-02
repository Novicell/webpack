import { myWebpackConfig, myWebpackPaths } from "./my.webpack.config";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as Path from "path";
import * as Webpack from "webpack";
import * as BundleAnalyzerPlugin from "webpack-bundle-analyzer";

export default class ConfigBase {
   private baseconfig = {
    entry: myWebpackConfig.entry,
    output: {
      filename: "[name]/[name].js",
      path: myWebpackPaths.destinationDirectoryPath
    },
    module: {
      rules: [{
          // Compile Javascript
          test: /\.jsx?$/i,
          include: myWebpackConfig.includeScriptsPaths,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        },
        {
          // Compile Typescript
          test: /\.tsx?$/i,
          include: myWebpackConfig.includeScriptsPaths,
          use: "ts-loader"
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          include: myWebpackConfig.includeFontsPaths,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: myWebpackPaths.fontsDirectoryName + "/"
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".json", ".js", ".jsx", ".css", ".less", ".pcss", ".scss", ".sass", ".tsx", ".ts"],
      alias: myWebpackConfig.alias
    },
    plugins: [
      // Delete files and folders from Dist directory
      new CleanWebpackPlugin([myWebpackPaths.destinationDirectoryPath], {
        allowExternal: true
      }),
      // Extracts vendor as  seperate bundle
      new Webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
      }),
      // Extracts webpack runtime as  seperate bundle
      new Webpack.optimize.CommonsChunkPlugin({
        name: "runtime"
      }),
      new CopyWebpackPlugin([
      // Fonts-copy directory
      {
        from: Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.fontsDirectoryName, myWebpackPaths.fontsDirectoryCopyDirectoryName),
        to: Path.resolve(myWebpackPaths.destinationDirectoryPath, myWebpackPaths.fontsDirectoryCopyDirectoryName)
      },
      // Image-copy directory
      {
        from: Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.imagesDirectoryName, myWebpackPaths.imagesDirectCopyDirectoryName),
        to: Path.resolve(myWebpackPaths.destinationDirectoryPath, myWebpackPaths.imagesDirectoryName)
      },
      // Icon-copy directory
      {
        from: Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.iconsDirectoryName, myWebpackPaths.iconsDirectoryCopyDirectoryName),
        to: Path.resolve(myWebpackPaths.destinationDirectoryPath, myWebpackPaths.imagesDirectoryName)
      }
    ])
    ],
    devtool: "inline-source-map"
  };

  constructor(public env: string | any) {
      this.addPlugins();
  }

  private addPlugins() {
    // Add use of webpack Analyzer plugin
    if (this.env.USE_WEBPACK_ANALYZER && this.env.USE_WEBPACK_ANALYZER) {
      // Display a analyse
      this.baseconfig.plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin());
    }

    // Add use of TSLint
    if (myWebpackConfig.useTSLint) {
      const tsLintConfig = {
          enforce: "pre",
          test: /\.tsx?$/,
          include: myWebpackConfig.includeScriptsPaths,
          use: "tslint-loader"
      };

      this.baseconfig.module.rules.push(tsLintConfig);
    }
  }

  public get config() {
    return this.baseconfig;
  }
}
