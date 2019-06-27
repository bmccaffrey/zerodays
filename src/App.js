import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/home';
import Login from './Components/Login';

const App = () => (
	<Router>
		<div>
			<h1>No Zero Days</h1>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login} />
			</Switch>
		</div>
	</Router>
);

export default App;
