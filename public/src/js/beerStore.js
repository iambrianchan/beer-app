import { EventEmitter } from "events";

import dispatcher from "./dispatcher";

class BeerStore extends EventEmitter {
	constructor() {
		super();
		this.beers = [];
		this.description = {};
	}

	getBeers() {
		return this.beers;
	}

	getDescription() {
		return this.description;
	}

	updateBeers(beers, query) {
		this.beers = [];
		for (let i = 0; i < beers.length; i++) {
			if (beers[i].name.toLowerCase() == query.toLowerCase()) {
				this.beers.push(beers[i]);
			}
		}
		if (this.beers.length == 0) {
			this.beers = beers;		
		}
		for (let i = 0; i < this.beers.length; i++) {
			if (!this.beers[i]) console.log(i, this.beers[i]);
		}
		return;
	}

	updateDescription(rating, beer) {

		this.description.id = beer.id;
		this.description.name = beer.name;
		this.description.brewery = beer.breweries[0].name;
		this.description.locality = beer.breweries[0].locations ? beer.breweries[0].locations[0].locality : "n/a";
		this.description.region = beer.breweries[0].locations ? beer.breweries[0].locations[0].region : "n/a";
		this.description.country = beer.breweries[0].locations ? beer.breweries[0].locations[0].countryIsoCode : "n/a";
		this.description.style = beer.style.name;
		this.description.description = beer.style.description;
		this.description.abv = beer.abv || "n/a";
		this.description.ibu = beer.ibu || "n/a";

		this.description.BaRating = (rating != undefined && rating.length > 0) ? rating[0].ba_rating : "n/a";
		this.description.BaScore = (rating != undefined && rating.length > 0) ? rating[0].ba_score : "n/a";
		this.description.BrosRating = (rating != undefined && rating.length > 0) ? rating[0].bros_rating : "n/a";
		this.description.BrosScore = (rating != undefined && rating.length > 0) ? rating[0].bros_score : "n/a";

		return;
	}

	handleActions(action) {
		// console.log(action);
		switch (action.type) {

			case "UPDATE_BEERS": {
				this.updateBeers(action.beers.data, action.query);

				this.emit("change");
				break;
			}

			case "LOAD_DESCRIPTION": {
				this.updateDescription(action.rating, action.beer)

				this.emit("description");
				break;
			}

			case "RECEIVED_RATING": {
				this.updateDescription(action.rating, action.beer);

				this.emit("description");
				break;
			}
		}
	}
}

const beerStore = new BeerStore;
beerStore.setMaxListeners(0);

dispatcher.register(beerStore.handleActions.bind(beerStore));


export default beerStore;