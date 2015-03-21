"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var del = require('del');
var babelify = require("babelify");
var fs = require("fs");

gulp.task('javascript', function() {
  var file = fs.createWriteStream("./build/game.js");
  file.on("finish", function() {
    browserSync.reload();
  });

  browserify({ debug: true })
  .transform(babelify)
  .require('./src/index.js', { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(file);
});

// copy html, css, assets to build directory
gulp.task('copy-assets', function() {
  // create build directory if it doesn't already exists
  if (!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }

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

// clean build directory
gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch(['src/*.js','src/*/*.js'], ['javascript']);
});
