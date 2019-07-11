import React from 'react';
import styled from 'styled-components';
import LogoutOutButton from './Elements/LogoutButton';
const Banner = styled.header`
	background: black;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h1`
	color: white;
	font-size: 1rem;
	text-align: center;
`;

const Header = () => (
	<Banner>
		<Title>No Zero Days</Title>
		<LogoutOutButton />
	</Banner>
);

export default Header;
