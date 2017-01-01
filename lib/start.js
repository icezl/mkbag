module.exports = function() {
    var gulp = require('gulp'),
        less = require('gulp-less'),
        browserSync = require('browser-sync').create(),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        cssmin = require('gulp-clean-css'),
        reload = browserSync.reload;

    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });


    gulp.watch("app/sass/**/*.sass").on('change', function(event) {
        gulp.src(event.path)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(cssmin({
                advanced: true,
                compatibility: 'ie7',
                keepBreaks: false,
                keepSpecialComments: '*'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("app/css"));
    });

    gulp.watch("app/sass/**/*.scss").on('change', function(event) {
        gulp.src(event.path)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(cssmin({
                advanced: true,
                compatibility: 'ie7',
                keepBreaks: false,
                keepSpecialComments: '*'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("app/css"));
    });
    gulp.watch("app/less/**/*.less").on('change', function(event) {
        gulp.src(event.path)
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(cssmin({
                advanced: true,
                compatibility: 'ie7',
                keepBreaks: false,
                keepSpecialComments: '*'
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("app/css"));
    });
    gulp.watch("app/css/**/*.css").on('change', function(event) {

        gulp.src(event.path)
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.reload({ stream: true }));
    });
    gulp.watch("app/js/**/*.js").on('change', reload);
    gulp.watch("app/**/*.html").on('change', reload);
};
