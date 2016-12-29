module.exports = function() {
    var gulp = require('gulp'),
        less = require('gulp-less'),
        browserSync = require('browser-sync').create(),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        reload = browserSync.reload;

    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });

    gulp.task('sass', function() {
        return gulp.src(["app/sass/**/*.sass"])
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("app/css"));
    });
    gulp.task('scss', function() {
        return gulp.src(["app/sass/**/*.scss"])
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("app/css"));
    });
    gulp.task('less', function() {
        return gulp.src(["app/less/**/*.less"])
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("app/css"));
    });


    gulp.watch("app/sass/**/*.sass", ['sass']);
    gulp.watch("app/sass/**/*.scss", ['scss']);
    gulp.watch("app/less/**/*.less", ['less']);
    gulp.watch("app/css/**/*.css").on('change', function(event) {
        gulp.src(event.path)
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.reload({ stream: true }));
    });
    gulp.watch("app/js/**/*.js").on('change', reload);
    gulp.watch("app/**/*.html").on('change', reload);
};
