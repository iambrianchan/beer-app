import dispatcher from "./dispatcher";
import * as http from "http";

export function getBeers(beer) {

	beer = beer.split(" ").join("+").toLowerCase();
	var options = {
		hostname: "",
		path: "/beers/" + beer
	};
	var data = "";

	var callback = function(response) {
		response.on("data", function onData(chunk) {
			data += chunk;
			return;
		});
		response.on("error", function onError(error) {
			return console.log(error);
		});
		response.on("end", function onEnd() {
			return dispatcher.dispatch({
				type: "UPDATE_BEERS",
				beers: JSON.parse(data),
				query: beer.split("+").join(" ")
			});
		});
	}

	var req = http.get(options, callback);
}

export function getRating(beer) {
	dispatcher.dispatch({
		type: "LOAD_DESCRIPTION",
		beer: beer
	});

	var data = "";
	var body = JSON.stringify(beer);

	var options = {
		method: "POST",
		hostname: "",
		path: "/ratings",
		headers: {
			'Content-Type': 'application/json',
        	'Content-Length': Buffer.byteLength(body)
		}
	};

	var callback = function(response) {

		response.on("data", function onData(chunk) {
			data += chunk;
			return;
		});
		response.on("error", function onError(error) {
			return console.log(error);
		});
		response.on("end", function onEnd() {
			return dispatcher.dispatch({
				type: "RECEIVED_RATING",
				rating: JSON.parse(data),
				beer: beer
			});
		});
	};

	var req = http.request(options, callback);

	req.write(body);
	req.end();
}