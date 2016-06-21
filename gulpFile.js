/**
 * Created by Moment on 16/6/20.
 */

// 引用模块
var path = require("path");
// 删除文件
var del = require("del");
// 筛选文件
var glob = require("glob");
// gulp相关模块
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var minifyCss = require("gulp-minify-css");
// gulp 顺序任务
var gulpSequence = require("run-sequence").use(gulp);
// webpack
var webpack = require("gulp-webpack");

// 其他变量
// webpack 配置
var webpackConfig = require("./webpack.config");
// 静态文件根路径
var rootPath = path.resolve('www','static');

gulp.task("clean",function (cb) {
    var buildPath = path.resolve(rootPath,'build');
    del(buildPath).then(cb());
});

gulp.task("default",function (cb) {
    gulpSequence('clean',['styles','images','libs'],'webpack',cb);
});

gulp.task('styles',function () {
    var path = rootPath + "/src/styles/**";
    var destPath = rootPath + "/build/styles";
    return gulp.src(path).pipe(minifyCss()).pipe(gulp.dest(destPath));
});

gulp.task('images',function () {
    var path = rootPath + "/src/images/**";
    var destPath = rootPath + "/build/images";
    return gulp.src(path).pipe(gulp.dest(destPath));
});

gulp.task('libs',function () {
    var path = rootPath + "/src/libs/**";
    var destPath = rootPath + "/build/libs";
    return gulp.src(path).pipe(gulp.dest(destPath));
});

gulp.task("webpack",function (cb) {
    var jsModulePath = path.resolve(rootPath,'src','modules') + '/**/entry.js';
    glob(jsModulePath,null,function (err,filesPath) {
        if(err){
            console.log("glob file error in task:webpack");
        }
        filesPath.map(function (filePath) {
            webpackConfig.entry.entry = filePath;
            var singleDestDir = path.dirname(filePath).replace("src/modules","build/modules");
            webpack(webpackConfig,null,null)
                .pipe(gulp.dest(singleDestDir))
                .pipe(uglify())
                .pipe(rename(function (path) {
                    path.basename = path.basename.replace('.pack',".min");
                }))
                .pipe(gulp.dest(singleDestDir));
        });
    });
});




// gulp.task("default",['clean'],function () {
//    var jsModulePath = path.resolve(rootPath,'src','modules') + '/**/entry.js';
//    var destPath = path.resolve(rootPath,'build');
//    gulp.src(jsModulePath)
//        .pipe(rename({ extname: '.pack.js' }))
//        .pipe(gulp.dest(destPath))
//        .pipe(uglify())
//        .pipe(rename(function (path) {
// 			path.basename = path.basename.replace('.pack',".min");
//        }))
//        .pipe(gulp.dest(destPath));
// });








