import * as BeerActions from "./../beerActions";
import BeerStore from "./../beerStore";

class Beer extends React.Component {
	constructor() {
		super();
		this.state = {
			description: {}
		};
		this.search = this.search.bind(this);
	};

	search() {
		if (!this.props.data) {
			return;
		}

		return BeerActions.getRating(this.props.data);
	}

	componentWillMount() {

	}

	render() {
		return (
			<div id={this.props.data.id} className="beer" onClick={this.search}>
				<h4>{this.props.data.name}</h4>
				<img className={this.props.data.image ? "custom" : ""} src={this.props.data.image || ( this.props.data.labels ? this.props.data.labels.large : this.props.data.breweries[0].images.squareLarge )}></img>
			</div>
		)
	}
}

export default Beer;