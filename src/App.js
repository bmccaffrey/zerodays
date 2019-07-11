import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import withAuth from './Components/Utilities/withAuth';
import Home from './Components/Home';
import Activities from './Components/Activity';
import Header from './Components/Header';
import Footer from './Components/Footer';
import styled from 'styled-components';

const App = () => (
	<Router>
		<Container>
			<FooterPadding>
				<Header />
				<Switch>
					<Route path="/" exact component={withAuth(Activities)} />
					<Route path="/home" component={withAuth(Home)} />
					<Route path="/login" component={Login} />
				</Switch>
				<Footer />
			</FooterPadding>
		</Container>
	</Router>
);

const FooterPadding = styled.div`
	padding-bottom: 2.5rem;
`;

const Container = styled.div`
	position: relative;
	min-height: 100vh;
`;

export default App;
