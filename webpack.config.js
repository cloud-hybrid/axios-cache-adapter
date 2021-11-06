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

// List external dependencies
const dependencies = [
    "axios"
];

dependencies.forEach(dep => {
    externals[dep] = {
        umd: dep,
        amd: dep,
        commonjs: dep,
        commonjs2: dep
    }
})

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
        filename,
        library: "axiosCacheAdapter",
        libraryTarget: "umd"
    },
    mode,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "src")
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

module.exports = process.env.NODE_ENV === "test" ? test: build
