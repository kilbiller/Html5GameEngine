var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require("browser-sync");
var del = require("del");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var watchify = require("watchify");
var spawn = require("child_process").spawn;

var b = watchify(
  browserify({
    entries: "./src/index.js",
    debug: true,
    cache: {},
    packageCache: {}
  })
);
b.transform(babelify, { presets: ["@babel/preset-env"] });

gulp.task("javascript", function() {
  function rebundle() {
    var bundle = b
      .bundle()
      .pipe(source("game.js"))
      .pipe(buffer());

    bundle
      .on("error", console.log)
      .pipe(gulp.dest("./build/"))
      .pipe(
        browserSync.reload({
          stream: true,
          once: true
        })
      );

    return bundle;
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
  if (node) {
    node.kill();
  }
  node = spawn("node", ["index.js"], {
    stdio: "inherit"
  });
  node.on("close", function(code) {
    if (code === 8) {
      gulp.log("Error detected, waiting for changes...");
    }
  });
});

// clean build directory
gulp.task("clean", function() {
  return del(["build"]);
});

gulp.task(
  "default",
  gulp.series(
    "javascript",
    gulp.parallel("server", "browser-sync", function() {
      gulp.watch("index.js", gulp.parallel("server", browserSync.reload));
    })
  )
);

gulp.task("build", gulp.series("javascript"));
