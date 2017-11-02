export interface IEntry {
    [key: string]: string | string[];
}

export interface IAlias {
    [key: string]: string;
}

export interface IMyWebpackConfig {
    useTSLint: boolean;
    includeStylesPaths: string[];
    includeImagePaths: string [];
    includeScriptsPaths: string [];
    includeFontsPaths: string[];
    entry: IEntry;
    alias: IAlias;
    livereload: {
        protocol: string;
        port: number;
        hostname: string;
    };
}

export interface IMyWebpackPaths {
    basedirPath: string;
    sourceDirectoryName: string;
    sourceDirectoryPath: string;
    destinationDirectoryName: string;
    destinationDirectoryPath: string;
    fontsDirectoryName: string;
    fontsDirectoryCopyDirectoryName: string;
    imagesDirectoryName: string;
    scriptsDirectoryName: string;
    stylesDirectoryName: string;
    iconsDirectoryName: string;
    iconsDirectoryCopyDirectoryName: string;
    imagesDirectCopyDirectoryName: string;
    nodeModulesDirectory: string;
}
