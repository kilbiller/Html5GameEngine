"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var connect = require('connect');
var serveStatic = require('serve-static');
var browserify = require('browserify');
var traceur = require('gulp-traceur');

gulp.task('browserify', function() {
    browserify('./src/Main.js')
        .bundle()
        .pipe(source('game.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('connect', function() {
    var app = connect();

    app.use(serveStatic('build'));
    app.listen(3000);
});

// Use with google traceur compiler (still needs work).
gulp.task('traceur', function () {
    gulp.src('src/**/*.js')
        .pipe(traceur({sourceMaps: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['browserify', 'connect']);
