/**
 * Created by Moment on 16/6/20.
 */

/*---------------引用模块--Start------------------*/

var path = require("path");
// 删除文件
var del = require("del");
// 筛选文件
var glob = require("glob");
// gulp相关模块
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
// 自动添加css前缀
// var autoprefixer = require("gulp-autoprefixer");
var minifyCss = require("gulp-minify-css");
// 图片缓存，只有图片替换了才压缩
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
// gulp 顺序任务
var gulpSequence = require("run-sequence").use(gulp);
// webpack
var webpack = require("gulp-webpack");
// 自动刷新页面
var liveReload = require("gulp-livereload");
// 通知模块
var notify = require("gulp-notify");
// 命令行参数
var argv = require('yargs')
    .alias('pa', 'path')//路径 相对于javascript 下 entry.js路径  如:addGoods/  此参数用于开发时，单个文件兼听 不压缩代码
    .default('pa', '')
    .argv;
/*---------------引用模块--End------------------*/
// 单个任务的指定路径 (el: gulp single --path business/chat/show )
var assignPath = argv.path.toLowerCase();
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
    return gulp.src(path)
        // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifyCss())
        .pipe(gulp.dest(destPath));
        // .pipe(notify({ message: 'Task:styles complete' }));
});

gulp.task('images',function () {
    var path = rootPath + "/src/images/**";
    var destPath = rootPath + "/build/images";
    return gulp.src(path)
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(destPath));
        // .pipe(notify({ message: 'Task:Images complete' }));
});

gulp.task('libs',function () {
    var path = rootPath + "/src/libs/**";
    var destPath = rootPath + "/build/libs";
    return gulp.src(path)
        .pipe(gulp.dest(destPath));
        // .pipe(notify({ message: 'Task:libs complete' }));
});

gulp.task("webpack",function (cb) {
    var jsModulePath = path.resolve(rootPath,'src','modules') + '/**/entry.js';
    if(assignPath){
        // 单个模块的打包
        jsModulePath = path.resolve(rootPath,'src','modules',assignPath) + '/**/entry.js';
    }
    glob(jsModulePath,null,function (err,filesPath) {
        if(err){
            console.log("glob file error in task:webpack");
            throw new Error(err);
        }
        var fileLength = filesPath.length;
        // .pipe(rename({ extname: '.pack.js' }))
        filesPath.map(function (filePath,index) {
            webpackConfig.entry.entry = filePath;
            var singleDestDir = path.dirname(filePath).replace("src/modules","build/modules");
            webpack(webpackConfig,null,function () {
                if(index == fileLength -1){
                    // webpack打包所有文件完成
                    cb();
                }
            })
                .pipe(gulp.dest(singleDestDir))
                .pipe(uglify())
                .pipe(rename(function (path) {
                    path.basename = path.basename.replace('.pack',".min");
                }))
                .pipe(gulp.dest(singleDestDir));
                // .pipe(notify({ message: 'Task:Webpack file '+ index+' complete' }));
        });
    });
});

// 第一种解决方案
gulp.task("single",['webpack'],function (cb) {
    var singlePath = path.resolve(rootPath,'src','modules',assignPath,'**');
    gulp.watch(singlePath, ['webpack']);
    //// Create LiveReload server
    // liveReload.listen();
    //// Watch any files in assets/, reload on change
    // gulp.watch(['assets/*']).on('change', livereload.changed);
});

// gulp.task("singleWebpack",function (cb) {
//     var singlePath = path.resolve(rootPath,'src','modules',assignPath,'**/*.js');
//     var buildPath = path.resolve(rootPath,'build','modules',assignPath);
//     webpackConfig.entry.entry = path.resolve(rootPath,'src','modules',assignPath,'entry.js');
//     return gulp.src(singlePath)
//         .pipe(webpack(webpackConfig,null,null))
//         .pipe(gulp.dest(buildPath))
//         .pipe(uglify())
//         .pipe(rename(function (path) {
//             path.basename = path.basename.replace('.pack',".min");
//         }))
//         .pipe(gulp.dest(buildPath))
//         .pipe(notify({ message: 'Task:singleWebpack complete' }));
// });
//
// // 第二种解决方案
// gulp.task("single",['singleWebpack'],function (cb) {
//     var singlePath = path.resolve(rootPath,'src','modules',assignPath,'**');
//     gulp.watch(singlePath, ['singleWebpack']);
//     //// Create LiveReload server
//     // liveReload.listen();
//     //// Watch any files in assets/, reload on change
//     // gulp.watch(['assets/*']).on('change', livereload.changed);
// });