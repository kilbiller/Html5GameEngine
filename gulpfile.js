"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var del = require('del');
var to5 = require("gulp-6to5");

gulp.task('javascript', function() {
    var bundler = watchify(browserify('./src/index.js', watchify.args));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('game.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(to5())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream:true, once: true}));
    }

    return rebundle();
});

// copy html, css, assets to build directory
gulp.task('copy-assets', function() {
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

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('default', ['browser-sync']);
