var gulp = require("gulp");
var browserify = require("browserify");
var del = require("del");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var spawn = require("child_process").spawn;

gulp.task("javascript", function() {
  return browserify({
    entries: "./src/index.js"
  })
    .transform(babelify, { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source("game.js"))
    .pipe(gulp.dest("./build/"));
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

gulp.task("clean", function() {
  return del(["build"]);
});

gulp.task("default", gulp.series("javascript", "server"));

gulp.task("build", gulp.series("javascript"));
