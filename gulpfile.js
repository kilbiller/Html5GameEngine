var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require("browser-sync");
var del = require("del");
var babelify = require("babelify");
var uglify = require("gulp-uglify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var watchify = require("watchify");
var spawn = require("child_process").spawn;

var b = watchify(browserify({
  entries: "./src/index.js",
  debug: true,
  cache: {},
  packageCache: {}
}));
b.transform(babelify);

gulp.task("javascript", function() {
  function rebundle() {
    return b.bundle()
      .pipe(source("game.js"))
      .pipe(buffer())
      /*.pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))*/
      .on("error", gutil.log)
      .pipe(gulp.dest("./build/"))
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }));
  }

  b.on("update", rebundle);

  return rebundle();
});

gulp.task("browser-sync", function() {
  browserSync.init({
    port: 3000,
    proxy: "http://localhost:8000"
  });
});

var node;
gulp.task("server", function() {
  if(node) {
    node.kill();
  }
  node = spawn("node", ["index.js"], {
    stdio: "inherit"
  });
  node.on("close", function(code) {
    if(code === 8) {
      gulp.log("Error detected, waiting for changes...");
    }
  });
});

// clean build directory
gulp.task("clean", function(cb) {
  del(["build"], cb);
});

gulp.task("default", ["javascript", "server", "browser-sync"], function() {
  gulp.watch("index.js", ["server", browserSync.reload]);
});
