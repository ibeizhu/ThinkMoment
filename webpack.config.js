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
            // 使用Babel转换ES6，排除node_modules目录下的js
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}, // use ! to chain loaders
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader'},
            {test: /\.(html|tpl)$/, loader: 'html-loader'}
        ]
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
