/**
 * Created by Moment on 16/5/27.
 */
var path = require("path");
var webpack = require('webpack');
require('es6-promise').polyfill();
var ignoreFiles = new webpack.IgnorePlugin(/\.\/jquery-last.js$/);

var filename = "[name].pack.js";
if(process.argv[3]=="-min"){
    filename = "[name].min.js";
}
module.exports = {
    entry: {
        "entry":'./entry.js'
    },
    output: {
        path: "./",
        filename: filename
    },
    module:{
        loaders:[
            {test: /\.html$/, loader: "html"},
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
            {test: /\.json$/,   loader: "json"}
        ]
    },
    resolve: {
        alias: {
            BaseVue: "../../../../../libs/framework/BaseVue.js"
        },
        extensions: ['', '.js', '.jsx','.html','.css']
    },
    plugins: [ignoreFiles]
};