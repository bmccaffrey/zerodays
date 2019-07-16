import React from 'react';
import HomeIcon from './Icons/Home.svg';
import TodoIcon from './Icons/Todo.svg';
import CompletedIcon from './Icons/Completed.svg';
import LogoutIcon from './Icons/Logout.svg';
import StyledLink from './Elements/StyledLink';
import styled from 'styled-components';

function logout() {
	fetch('/removeToken')
		.then(res => {
			if (res.status === 200) {
				console.log('Should be removed');
			} else {
				alert('Unable to logout');
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => {
			console.error(err);
		});
}

const Home = (
	<StyledLink to="/home">
		<img src={HomeIcon} alt="home icon" />
	</StyledLink>
);
const Pending = (
	<StyledLink to="/">
		<img src={TodoIcon} alt="list icon" />
	</StyledLink>
);

const Completed = (
	<StyledLink to="/completed">
		<img src={CompletedIcon} alt="completed icon" />
	</StyledLink>
);

const Logout = (
	<StyledLink to="/login">
		<img src={LogoutIcon} alt="logout icon" onClick={logout} />
	</StyledLink>
);

function displayIconsBasedOnPage(props) {
	const currentPage = props.page;
	if (currentPage === 'home') {
		return (
			<>
				{Pending}
				{Completed}
			</>
		);
	} else if (currentPage === 'todo') {
		return (
			<>
				{Home}
				{Completed}
			</>
		);
	} else {
		return (
			<>
				{Home}
				{Pending}
			</>
		);
	}
}

const Menu = props => (
	<FlexContainer>
		{displayIconsBasedOnPage(props)}
		{Logout}
	</FlexContainer>
);

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0px 15px;
`;

export default Menu;
