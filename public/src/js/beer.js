// var React = require('react');
// var ReactDom = require('react-dom');
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// var ReactGA = require('react-ga');
// var Beer = require('./components/app.jsx');
import React from 'react';
import ReactDOM from 'react-dom';
const title = "my shitty little app";
import App from './components/app.jsx';

// ReactGA.initialize('UA-89957529-3');


// function logPageView() {
// 	ReactGA.set({ page: window.location.pathname });
// 	ReactGA.pageview(window.location.pathname);
// }

ReactDOM.render((
	// <div>
		// {title}
		<App />
	// </div>
	// <Router history={browserHistory} onUpdate={logPageView}>
	// 	<Route path='/' component={Beer} />
	// </Router>
	), 
document.getElementById('beer'));

// uses react-router instead
// ReactDom.render(<Beer />, document.getElementById('beer'));