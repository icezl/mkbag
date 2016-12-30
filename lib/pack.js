module.exports = function() {
    var path = require('path'),
        fs = require('fs'),
        gulp = require('gulp'),
        htmlmin = require('gulp-htmlmin'),
        sass = require('gulp-sass'),
        less = require('gulp-less'),
        cssmin = require('gulp-clean-css'),
        sourcemaps = require('gulp-sourcemaps'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        cache = require('gulp-cache');

    var commands = ['css', 'sass', 'less', 'js', 'img', 'path','html'],
        agus = arguments[0],
        defaultDir = 'dist',
        comCount = 0;

    var gulpTasks = {
        css: function() {
            gulp.src(['app/**/*.css'])
                .pipe(cssmin({
                    advanced: true,
                    compatibility: 'ie7',
                    keepBreaks: false,
                    keepSpecialComments: '*'
                }))
                .pipe(gulp.dest(defaultDir + '/'));
        },
        sass: function() {
            gulp.src(['app/sass/**/*.s?ss'])
                .pipe(sass())
                .pipe(cssmin({
                    advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                    compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                    keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
                    keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
                }))
                .pipe(gulp.dest(defaultDir + '/css'));
        },
        less: function() {
            gulp.src(['app/less/**/*.less'])
                .pipe(less())
                .pipe(cssmin({
                    advanced: true,
                    compatibility: 'ie7',
                    keepBreaks: false,
                    keepSpecialComments: '*'
                }))
                .pipe(gulp.dest(defaultDir + '/css'));
        },
        js: function() {
            gulp.src(['app/**/*.js'])
                .pipe(uglify({
                    mangle: { except: ['require', 'exports', 'module', '$'] }, //排除混淆关键字,false to skip mangling names.
                    compress: true //类型：Boolean 默认：true 是否完全压缩
                        //preserveComments: 'all' //保留所有注释
                }))
                .pipe(gulp.dest(defaultDir + '/'));
        },
        img: function() {
            gulp.src('app/**/*.{png,jpg,gif,ico}')

            .pipe(cache(imagemin({
                    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                    multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                    svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
                    use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
                })))
                .pipe(gulp.dest(defaultDir + '/'));
        },
        html: function() {
            var options = {
                caseSensitive: true, //标签属性名区别大小写
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            };
            gulp.src('app/**/*.html')
                .pipe(htmlmin(options))
                .pipe(gulp.dest(defaultDir));
        },
        all: function() {
            this.css();
            this.less();
            this.sass();
            this.js();
            this.img();
            this.html();
        }
    };

    if (agus.path && agus.path != 'true') {
        defaultDir = agus.path;
        delete agus.path;
    }

    for (var key in agus) {
        if (agus[key] && commands.indexOf(key) > -1) {
            gulpTasks[key]();
            comCount++;
        }
    }

    if (comCount == 0) {
        gulpTasks.all();
    }
};
