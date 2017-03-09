module.exports = function() {
    var path = require('path');
    var gulp = require('gulp'),
        less = require('gulp-less'),
        sass = require('gulp-sass'),
        htmlmin = require('gulp-htmlmin'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        cssmin = require('gulp-clean-css'),
        fileinclude = require('gulp-file-include'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        cache = require('gulp-cache'),
        browserSync = require('browser-sync').create(),
        reload = browserSync.reload;

    //执行打包
    var gulpTasks = {
        init: function() {
            var that = this;
            console.log('初始化...进行中');
            console.log('拷贝app下文件至dist目录...进行中');
            gulp.src(["app/**/*.*"])
                .pipe(gulp.dest('dist'))
                .on('end', function() {
                    console.log('拷贝app下文件至dist目录...已完成');
                    that.html();
                });
        },
        html: function() {
            var that = this;
            console.log('编译dist下html文件...进行中');
            gulp.src('app/**/*.html')
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(gulp.dest('dist'))
                .on('end', function() {
                    console.log('编译dist下html文件...已完成');
                    that.sass();
                });
        },
        sass: function() {
            var that = this;
            console.log('编译dist下sass文件...进行中');
            gulp.src(["app/**/*.sass", "app/**/*.scss"], { base: 'app/sass' })
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(cssmin({
                    advanced: true,
                    compatibility: 'ie7',
                    keepBreaks: false,
                    keepSpecialComments: '*'
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest("dist/css"))
                .on('end', function() {
                    console.log('编译dist下sass文件...已完成');
                    that.less();
                });
        },
        less: function() {
            var that = this;
            console.log('编译dist下less文件...进行中');
            gulp.src("app/**/*.less", { base: 'app/less' })
                .pipe(sourcemaps.init())
                .pipe(less())
                .pipe(cssmin({
                    advanced: true,
                    compatibility: 'ie7',
                    keepBreaks: false,
                    keepSpecialComments: '*'
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest("dist/css"))
                .on('end', function() {
                    console.log('编译dist下less文件...已完成');
                    that.js();
                });
        },
        js: function() {
            var that = this;
            console.log('编译dist下js文件...进行中');
            gulp.src(["app/**/*.js", "!app/**/*.min.js", "!data/**/*.js"])
                .pipe(sourcemaps.init())
                .pipe(uglify({
                    mangle: { except: ['require', 'exports', 'module', '$'] }, //排除混淆关键字,false to skip mangling names.
                    compress: true //类型：Boolean 默认：true 是否完全压缩
                        //preserveComments: 'all' //保留所有注释
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest("dist"))
                .on('end', function() {
                    console.log('编译dist下js文件...已完成');
                    that.img();
                });
        },
        img: function() {
            var that = this;
            console.log('压缩dist下img文件...进行中');
            gulp.src('app/**/*.{png,jpg,gif,ico}')
                .pipe(cache(imagemin({
                    optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                    interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                    multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                    svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
                    use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
                })))
                .pipe(gulp.dest('dist'))
                .on('end', function() {
                    console.log('压缩dist下img文件...已完成');
                    that.server();
                });
        },
        server: function() {
            console.log('开启实时服务...进行中');
            browserSync.init({
                server: {
                    baseDir: "./dist/"
                }
            });
            console.log('开启实时服务...已完成');
            console.log('初始化...已完成');
        }
    };

    gulpTasks.init();

    //监控任务

    //sass
    gulp.watch(["app/**/*.sass", "app/**/*.scss"]).on('change', function(event) {

        console.log(event.path + 'sass有变化,进行实时编译...进行中');
        gulp.src(event.path, { base: 'app/sass' })
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(cssmin({
                advanced: true,
                compatibility: 'ie7',
                keepBreaks: false,
                keepSpecialComments: '*'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("dist/css"))
            .pipe(reload({stream: true}))
            .on('end', function() {
                console.log(event.path + 'sass有变化,进行实时编译...已完成');
            });
    });


    //less
    gulp.watch("app/**/*.less").on('change', function(event) {

        console.log(event.path + '有变化,进行实时编译...进行中');
        gulp.src(event.path, { base: 'app/less' })
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(cssmin({
                advanced: true,
                compatibility: 'ie7',
                keepBreaks: false,
                keepSpecialComments: '*'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("dist/css"))
            .pipe(reload({stream: true}))
            .on('end', function() {
                console.log(event.path + '有变化,进行实时编译...已完成');
                reload({ stream: true });
            });
    });

    //js
    gulp.watch("app/**/*.js").on('change', function(event) {

        console.log(event.path + '有变化,进行实时编译...进行中');
        gulp.src(event.path, { base: 'app' })
            .pipe(sourcemaps.init())
            .pipe(uglify({
                mangle: { except: ['require', 'exports', 'module', '$'] }, //排除混淆关键字,false to skip mangling names.
                compress: true //类型：Boolean 默认：true 是否完全压缩
                    //preserveComments: 'all' //保留所有注释
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist'))
            .on('end', function() {
                console.log(event.path + '有变化,进行实时编译...已完成');
                reload();
            });
    });

    //html
    gulp.watch("app/**/*.html").on('change', function(event) {

        console.log(event.path + '有变化,进行实时编译...进行中');
        gulp.src('app/**/*.html', { base: 'app' })
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist'))
            .on('end', function() {
                console.log(event.path + '有变化,进行实时编译...已完成');
                reload();
            });
    });

    //img
    gulp.watch("app/**/*.{png,jpg,gif,ico}").on('change', function(event) {

        console.log(event.path + '有变化,进行实时编译...进行中');
        gulp.src(event.path, { base: 'app' })
            .pipe(cache(imagemin({
                optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            })))
            .pipe(gulp.dest('dist'))
            .on('end', function() {
                console.log(event.path + '有变化,进行实时编译...已完成');
                reload();
            });
    });

    

};
