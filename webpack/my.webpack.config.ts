// Custom Webpack config
import * as Path from "path";
import { IMyWebpackConfig, IMyWebpackPaths } from "./webpack.interfaces";

// You Frontend projects root dir
const basedir: string = Path.resolve(__dirname, "..");
// Name of your source code folder
const sourceRootDirectoryName: string = "src";
// Name of your destination code folder
const destinationRootDirectoryName: string = "dist";

// Paths used in Webpack configuration
export const myWebpackPaths: IMyWebpackPaths = {
    basedirPath: basedir,
    fontsDirectoryName: "fonts",
    fontsDirectoryCopyDirectoryName: "copy-fonts",
    iconsDirectoryName: "icons",
    iconsDirectoryCopyDirectoryName: "copy-icons",
    imagesDirectoryName: "images",
    imagesDirectCopyDirectoryName: "copy-images",
    scriptsDirectoryName: "scripts",
    stylesDirectoryName: "styles",
    sourceDirectoryName: sourceRootDirectoryName,
    sourceDirectoryPath: Path.resolve(basedir, sourceRootDirectoryName),
    destinationDirectoryName: destinationRootDirectoryName,
    destinationDirectoryPath:  Path.resolve(basedir, "..", destinationRootDirectoryName),
    nodeModulesDirectory: Path.resolve(basedir, "node_modules")
};

export const myWebpackConfig: IMyWebpackConfig = {
    // Add webpack entry point. https://webpack.js.org/concepts/entry-points/
    entry: {
        app: Path.resolve(myWebpackPaths.sourceDirectoryPath, "app.ts")
        // vendor: []
    },
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: {},
    // Paths to include resolving script files js/ts
    includeScriptsPaths: [
        Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.scriptsDirectoryName),
        myWebpackPaths.nodeModulesDirectory
    ],
    // Paths to include resolving style files css/less/scss/sass/pcss
    includeStylesPaths: [
        Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.stylesDirectoryName),
        myWebpackPaths.nodeModulesDirectory
    ],
    // Paths to include resolving image files png/jpg/gif/svg
    includeImagePaths: [
        Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.imagesDirectoryName),
        Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.iconsDirectoryName),
        myWebpackPaths.nodeModulesDirectory
    ],
    // Paths to include resolving font files woff/woff2/eot/ttf/otf
    includeFontsPaths: [
        Path.resolve(myWebpackPaths.sourceDirectoryPath, myWebpackPaths.fontsDirectoryName),
        myWebpackPaths.nodeModulesDirectory
    ],
    // Use TSLINT when building. If your IDE performs TSLINT this isn't necessary
    useTSLint: false,
    // Settings for LiveReload Server
    livereload: {
        protocol: "http",
        port: 35729,
        hostname: "localhost"
    }
};
