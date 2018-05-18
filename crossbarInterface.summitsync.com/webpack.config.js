const path = require('path');

let loaderQuery = {
    "presets": ["es2015", "stage-1"],
    "babelrc": false,
    "compact": false,
    "plugins": ["syntax-decorators", "transform-decorators-legacy", "transform-class-properties", "transform-es2015-modules-umd"],
};
module.exports = {
    entry: { "SharedWorker": "./src/workers/worker.shared.js" },
    output: {
        path: "dist"
    },
    resolveLoader: {
        modules: [path.join(__dirname, "node_modules")]
    },
    module: {
        loaders: [
            {
                test: /\.json$/, loader: 'json-loader'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                query: loaderQuery,
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    node: {
        console: true,
        net: "empty",
        tls: "empty",
        fs: "empty",
        "child_process": "empty"
    },
}