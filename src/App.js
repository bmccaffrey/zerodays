import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import withAuth from './Components/Utilities/withAuth';
import ActivitiesController from './Components/ActivitiesController';
import Header from './Components/Header';
import Footer from './Components/Footer';
import styled from 'styled-components';

const App = () => (
	<Router>
		<Container>
			<Header />
			<Switch>
				<Route path="/" exact component={withAuth(ActivitiesController)} />
				<Route path="/login" component={Login} />
			</Switch>
			<Footer />
		</Container>
	</Router>
);

const Container = styled.div`
	position: relative;
	min-height: 100vh;
`;

export default App;
