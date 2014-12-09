"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var serveStatic = require('serve-static');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var del = require('del');

gulp.task('javascript', function() {
    var bundler = watchify(browserify('./src/index.js', watchify.args));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('game.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream:true, once: true})); //reload browserSync because javascript doesn't get updated otherwise
    }

    return rebundle();
});

gulp.task('copy-assets', function() {
    // copy html, css, assets to build directory
    gulp.src(['./src/index.html', './src/assets/**', './src/css/**'], { base: './src' })
    .pipe(gulp.dest('./build'));
});

gulp.task('browser-sync', ['copy-assets', 'javascript'], function() {
    browserSync.init(null, {
        server: {
            baseDir: "./build"
        }
    });
});

// Use with google traceur compiler (still needs work).
gulp.task('traceur', function() {
    //gulp.src('src/**/*.js')
    //.pipe(traceur({sourceMaps: true}))
    //.pipe(gulp.dest('build'));
});

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('default', ['browser-sync']);
