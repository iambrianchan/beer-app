var React = require('react');
var ReactDom = require('react-dom');
import { Router, Route, Link, browserHistory } from 'react-router';
var ReactGA = require('react-ga');
var Beer = require('./components/app.jsx');

ReactGA.initialize('UA-89957529-3');


function logPageView() {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
}

ReactDom.render((
	<Router history={browserHistory} onUpdate={logPageView}>
		<Route path='/' component={Beer} />
	</Router>
	), document.getElementById('beer'));

// uses react-router instead
// ReactDom.render(<Beer />, document.getElementById('beer'));