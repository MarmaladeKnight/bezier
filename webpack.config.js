const webpack = require('webpack');

const config = {
    entry: './lines.js',
    output: {
        path: __dirname,
        filename: 'lines.bundle.js'
    },
    devtool: 'source-map',
    module: {
    },
    plugins: [
    ],
    devServer: {
        index: 'index.html',
        openPage: 'index.html',
        open: true
    }
};

module.exports = config;
