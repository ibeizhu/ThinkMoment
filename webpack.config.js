/**
 * Created by Moment on 16/6/21.
 */

var path = require("path");

module.exports = {
    entry: {
        "entry": ""
    },
    output: {
        filename: '[name].pack.js'
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.less/, loader: 'style!css!autoprefixer!less'},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
        ]
    },
    vue: {
        loaders: {
            css: 'style!css!autoprefixer!less'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
            BaseVue: path.resolve("www/static/src/libs/framework/BaseVue.js"),
            tools: path.resolve("www/static/src/libs/js/tools"),
            plugin: path.resolve("www/static/src/libs/plugin")
        },
        extensions: ['', '.js', '.jsx', '.html', '.css']
    },
    plugins: [
        // new ExtractTextPlugin("[name].css")
    ]
};
