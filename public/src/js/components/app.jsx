import BeerStore from "./../beerStore";
import * as BeerActions from "./../beerActions";
import Beer from "./beer.jsx";

class App extends React.Component {

	// query, beers, description, active row
	constructor() {
		super();
		this.state = {
			numberInRow: 6,
			query: "",
			beers: BeerStore.getBeers(),
			description: BeerStore.getDescription(),
			activeRow: -1,
			keyup: this.keyup()
		};
		this.keyup = this.keyup.bind(this);
		this.search = this.search.bind(this);
		this.jump = this.jump.bind(this);
	}

	componentDidMount() {
		this.setState({
			numberInRow: document.getElementsByTagName("html")[0].className.indexOf("no-touchevents") > -1 ? 6 : 2 
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
			}, function callback() {
				for (let i = 0; i < this.state.beers.length; i++) {
					if (this.state.beers[i].id == this.state.description.id) {
						return this.setState({
							activeRow: Math.floor( ( i / this.state.numberInRow ) )
						}, function callback() {
							this.jump(this.state.description.id);
						});
					};
				};
			});
		});

		BeerStore.on("rating", () => {
			this.setState({
				description: BeerStore.getDescription()
			});
		});
	}

	// listen for key ups, if return button is pressed then search
	keyup() {
		document.addEventListener("keyup", function callback(e) {
			if (e.keyCode == 13) {
				this.search();
			}
			return;

		}.bind(this));
	}

	// send Action to search for a beer
	search() {
		if (!this.state.query) {
			return;
		}
		return BeerActions.getBeers(this.state.query.value);
	}

	jump(id) {
		return setTimeout(function() {
			if (document.getElementsByTagName("html")[0].className.indexOf("no-touchevents") == -1) {
				document.getElementById(id).scrollIntoView(true);				
			}
		}, 0);
	}

	render() {

		// create Beer components for each beer found
		var beers = this.state.beers.map(function createElement(item) {
			if ( !item.name || !item.breweries[0].images || !item.breweries[0].images.squareMedium ) {
				item.image = "/public/src/img/tap.png";
			}
			return (
				<Beer key={item.id} data={item} />
			)
		}.bind(this));

		var beerContainers = [];

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
						<div id={"detail-" + index} className="detail-container">
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
				<div>
					<div className="searchbar">
						<h1 className="title">find a beer</h1>
						<input type="text" ref={(c) => this.state.query = c}></input>
						<button onClick={this.search}><span className="glyphicon glyphicon-search"></span></button>
					</div>
				</div>
				<div className="results row">
					{beerContainers}
				</div>
			</div>
		)
	}
}

export default App;