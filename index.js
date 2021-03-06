var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var compression = require("compression");

var app = express();
var port = process.env.PORT || 8080;

app.set("views", __dirname + "/build/assets/views");

app.use(compression());
app.use(bodyParser.json());

app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("X-HTTP-Method-Override"));

app.use(express.static(__dirname + "/"));

require("./app/routes")(app);

app.listen(port);

console.log("running on port " + port);

exports = module.exports = app;
