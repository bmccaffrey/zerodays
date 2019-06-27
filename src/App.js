import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import TokenTester from './Components/TokenTester';
import Login from './Components/Login';
import withAuth from './Components/Utilities/withAuth';
import LogoutButton from './Components/Elements/LogoutButton';

const App = () => (
	<Router>
		<div>
			<h1>No Zero Days</h1>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/secret">Protected Route</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/secret" component={withAuth(TokenTester)} />
				<Route path="/login" component={Login} />
			</Switch>
		</div>
	</Router>
);

export default App;
