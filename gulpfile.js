var gulp = require("gulp");
var browserify = require("browserify");
var browserSync = require("browser-sync");
var del = require("del");
var babelify = require("babelify");
var fs = require("fs");

gulp.task("javascript", function() {
  if(!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
  }

  var file = fs.createWriteStream("./build/game.js");
  file.on("finish", function() {
    browserSync.reload();
  });

  browserify({
      debug: true
    })
    .transform(babelify)
    .require("./src/index.js", {
      entry: true
    })
    .bundle()
    .on("error", function(err) {
      console.log("Error: " + err.message);
    })
    .pipe(file);
});

gulp.task("browser-sync", ["javascript"], function() {
  browserSync.init({
    server: {
      baseDir: ["./", "assets"]
    }
  });
});

// clean build directory
gulp.task("clean", function(cb) {
  del(["build"], cb);
});

gulp.task("default", ["browser-sync"], function() {
  gulp.watch(["src/*.js", "src/*/*.js"], ["javascript"]);
});
