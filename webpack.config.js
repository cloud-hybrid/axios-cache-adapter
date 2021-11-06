const webpack = require("webpack");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Base filename and version variable to store what kind of version we"ll be generating
let filename = "cache[version].js";
const version = [""];

const plugins = [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin(),

]

const externals = {};

let mode = "development";
let target = "web";
let entry = "./src/index.js";

//// List external dependencies
//const dependencies = [
//    "axios"
//];
//
//dependencies.forEach(dep => {
//    externals[dep] = {
//        module: dep
//    }
//})

if (process.env.NODE_BUILD_FOR === "node") {
    version.push("node");
    target = "node";
    entry = "./src/index.node.js";
}

if (process.env.NODE_ENV === "production") {
    version.push("min");
    mode = "production";
}

filename = filename.replace("[version]", version.join("."));

// Webpack config
const build = {
    entry,
    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "module"
    },
    experiments: {
        futureDefaults: true,
        outputModule: true
    },
    mode,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "node_modules")
                ],
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                "targets": "defaults"
                            }]
                        ]
                    }
                }]
            }
        ]
    },
    externals,
    plugins,
    devtool: "source-map",
    target
}

build.experiments.outputModule = true;

module.exports = build;
