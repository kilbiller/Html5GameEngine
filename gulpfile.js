"use strict";

var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    http = require('http'),
    browserify = require('browserify');

gulp.task('browserify', function() {
    var bundleStream = browserify('./src/Main.js').bundle();

    bundleStream
    .pipe(source('game.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('connect', function() {
    var app = connect();

    app.use(serveStatic('build'));
    app.listen(3000);
});

gulp.task('default', ['browserify', 'connect']);
