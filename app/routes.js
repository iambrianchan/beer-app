// routes
"use strict";
var http = require("http");
var ba = require("ba-api");

var searchBA = function(beer, finish) {
	ba.beerSearch(beer.name, function callback(beers) {
		beers = JSON.parse(beers);
		var beerUrl;
		var theBeer;
		for (let i = 0; i < beers.length; i++) {
			if (beers[i].ba_score != undefined) {
				theBeer = beers[i];
				// return finish(beers[i]);
			}

			var sameName = beers[i].beer_name.toLowerCase().indexOf(beer.name.toLowerCase()) > -1;
			// var sameLocation = beer.breweries[0].locations ? beers[i].brewery_location.toLowerCase().indexOf(beer.breweries[0].locations[0].locality.toLowerCase()) > -1 : true;

			if (sameName) {
				theBeer = beers[i];
			}
		}
		if (typeof theBeer == "undefined") {
			return finish({});
		}

		else if (typeof theBeer.ba_score != "undefined") {
			return finish(JSON.stringify([theBeer]));
		}

		else if (typeof theBeer.beer_url != "undefined") {
			ba.beerPage(theBeer.beer_url, function callback(beer) {
				return finish(beer)
			})
		}
		else return finish({});
	})
};

var searchBrewDB = function(beer, finish) {
	beer = beer.split(' ').join("+").toLowerCase();
	var options = {
		host: "api.brewerydb.com",
		path: "/v2/search?key=9f79f90a7b0a36c1169c46e6beb4b9b0&q=" + beer + "&type=beer&withBreweries=Y"
	};
	var data = "";
	var callback = function(response) {
		response.on('data', function (chunk) {
			data += chunk;
			return;
		});
		response.on('error', function(e) {
			return console.log(e);
		})
		response.on('end', function() {
			return finish(data);
		})
	}
	var req = http.get(options, callback);
};


module.exports = function(app) {
	app.get("/beers/:beer", function callback(req, res) {
		var beer = req.params.beer;

		searchBrewDB(beer, function callback(data) {
			res.send(JSON.parse(data));
		});
	});
	app.post("/ratings", function callback(req, res) {

		searchBA(req.body, function(rating) {
			res.send(rating);
		})
	})
	app.get("*", function callback(req, res) {
		res.render("index");
	});
}
