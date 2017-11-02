import * as Webpack from "webpack";
import * as WebpackMerge from "webpack-merge";
import ConfigBase from "./webpack/webpack.config.base";
import ConfigDev from "./webpack/webpack.config.dev";
import ConfigProd from "./webpack/webpack.config.prod";

module.exports = (env: string | any) => {
    const configProd = new ConfigProd(env);
    const configDev = new ConfigDev(env);
    const configBase = new ConfigBase(env);
    return env.NODE_ENV === "production" ? WebpackMerge(configBase.config as Webpack.Configuration, configProd.config) : WebpackMerge(configBase.config as Webpack.Configuration, configDev.config);
};
