import * as BeerActions from "./../beerActions";
import BeerStore from "./../beerStore";

var beer = React.createClass({
	getInitialState: function() {
		return {
			description: {}
		}
	},

	search: function() {
		if (!this.props.data) {
			return;
		}

		return BeerActions.getRating(this.props.data);
	},

	componentWillMount: function() {

	},

	render: function() {
		return (
			<div id={this.props.data.id} className="beer" onClick={this.search}>
				<h4>{this.props.data.name}</h4>
				<img className={this.props.data.image ? "custom" : ""} src={this.props.data.image || ( this.props.data.labels ? this.props.data.labels.large : this.props.data.breweries[0].images.squareLarge )}></img>
			</div>
		)
	}
})

module.exports = beer;
