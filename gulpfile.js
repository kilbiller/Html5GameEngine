"use strict";

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var del = require('del');
var to5ify = require("6to5ify");

gulp.task('javascript', function() {
  return browserify('./src/index.js')
  .transform(to5ify)
  .bundle()
  //.pipe(uglify())
  .pipe(source('game.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./build'));
});

// copy html, css, assets to build directory
gulp.task('copy-assets', function() {
  gulp.src(['./src/index.html', './src/assets/**', './src/css/**'], { base: './src' })
  .pipe(gulp.dest('./build'));
});

gulp.task('browser-sync', ['copy-assets', 'javascript'], function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});

// cleazn build directory
gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch(['src/*.js','src/*/*.js'], ['javascript', browserSync.reload]);
});
