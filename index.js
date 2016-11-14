var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();
var port = process.env.PORT || 5000;

app.set("views", __dirname + "/public/src/views");
app.set("view engine", "pug");

app.use(bodyParser.json());

app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("X-HTTP-Method-Override"));

app.use(express.static(__dirname + "/"));

require("./app/routes")(app);

app.listen(port);

console.log("running on port " + port);

exports = module.exports = app;