var express = require("express");
var app = express();

app.set("port", process.env.PORT || 8000);

app.use(express.static("./"));
app.use(express.static("assets"));

app.listen(app.get("port"), function() {
  console.log("Express server listening at port " + app.get("port") + " in " + app.get("env") + " mode");
});
