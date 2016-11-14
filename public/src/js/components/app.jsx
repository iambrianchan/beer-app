import BeerStore from "./../beerStore";
import * as BeerActions from "./../beerActions";
import Beer from "./beer.jsx";

var app = React.createClass({

	// query, beers, description, active row
	getInitialState: function() {
		return {
			numberInRow: 6,
			query: "",
			beers: BeerStore.getBeers(),
			description: BeerStore.getDescription(),
			activeRow: -1
		}
	},

	componentWillMount: function() {
		this.setState({
			numberInRow: document.getElementsByTagName("html")[0].className.indexOf("touchevents") > -1 ? 2 : 6 
		});

		// on change update current beers
		BeerStore.on("change", () => {
			this.setState({
				beers: BeerStore.getBeers(),
				activeRow: -1
			});
		});

		// on description update current description
		BeerStore.on("description", () => {
			this.setState({
				description: BeerStore.getDescription()
			}, function() {
				for (let i = 0; i < this.state.beers.length; i++) {
					if (this.state.beers[i].id == this.state.description.id) {
						this.setState({
							activeRow: Math.floor( ( i / this.state.numberInRow ) )
						});
					};
				};
			});
		});
	},

	// send Action to search for a beer
	search: function() {
		if (!this.query) {
			return;
		}
		return BeerActions.getBeers(this.query.value);
	},
	render: function() {

		console.log(this.state.touch);
		// create Beer components for each beer found
		var beers = this.state.beers.map(function createElement(item) {
			if ( !item.name || !item.breweries[0].images || !item.breweries[0].images.squareMedium ) {
				item.image = "/src/img/tap.png";
			}
			return (
				<Beer key={item.id} data={item} />
			)
		}.bind(this));

		var beerContainers = [];
		// var numberInRow = this.state.touch ? 2 : 6;

		for (let i = beers.length - 1; i >= 0; i--) {
			if (!beers[i]) {
				beers.splice(i, 1);
			}
		}
		for (let i = 0; i < beers.length; i+=this.state.numberInRow) {
			if (i + this.state.numberInRow > beers.length) {
				beerContainers.push(beers.slice(i, beers.length));
			}
			else {
				beerContainers.push(beers.slice(i, i+this.state.numberInRow));
			}
		}

		// create the container that holds all beers
		beerContainers = beerContainers.map(function createRow(row, index) {
			return (
				<div key={index} id={index} className={this.state.activeRow == index ? "beer-row active" : "beer-row"}>
					<div>
						{row}
						<div className="detail-container">
							<div className="detail row">
								<h2>{ this.state.description.name }</h2>
								<div className="beer-detail">
									<span><i>{ this.state.description.style }</i> | </span>
									<span><b>{ this.state.description.brewery }</b> | </span>
									<span>{this.state.description.locality + ", " + this.state.description.region + " " + this.state.description.country}</span>
								</div>
								<div className="description col-lg-8">{this.state.description.description}</div>
								<div className="col-lg-4">
									<span>{"ABV % : " + this.state.description.abv}</span>
									<span>{"  |  IBU : " + this.state.description.ibu}</span>
									<table>
										<tbody>
											<tr>
												<td>Beer Advocate Rating </td>
												<td>{this.state.description.BaRating}</td>
											</tr>
											<tr>
												<td>Beer Advocate Score </td>
												<td>{this.state.description.BaScore}</td>
											</tr>
											<tr>
												<td>BA Bros Rating </td>
												<td>{this.state.description.BrosRating}</td>
											</tr>
											<tr>
												<td>BA Bros Score </td>
												<td>{this.state.description.BrosScore}</td>
											</tr>											
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}.bind(this));

		return (
			<div>
				<h1 className="title">What Brew am I Drinking?</h1>
				<div className="searchbar">
					<input type="text" ref={(c) => this.query = c}></input>
					<button onClick={this.search}><span className="glyphicon glyphicon-search"></span></button>
				</div>
				<div className="results row">
					{beerContainers}
				</div>
			</div>
		)
	}
})

module.exports = app;