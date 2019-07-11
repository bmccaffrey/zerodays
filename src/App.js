import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import withAuth from './Components/Utilities/withAuth';
import ActivitiesController from './Components/ActivitiesController';
import Header from './Components/Header';
const App = () => (
	<Router>
		<div>
			<Header />
			<Switch>
				<Route path="/" exact component={withAuth(ActivitiesController)} />
				<Route path="/login" component={Login} />
			</Switch>
		</div>
	</Router>
);

export default App;
