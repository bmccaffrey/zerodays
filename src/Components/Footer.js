import React from 'react';
import styled from 'styled-components';

const Footer = () => {
	return (
		<StyledFooter>
			<FlexContainer>
				<Hamburger />
				<button>+</button>
				<span>No Zero Days</span>
			</FlexContainer>
		</StyledFooter>
	);
};

const StyledFooter = styled.footer`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 2.5rem;
`;
const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Line = styled.div`
	border: 1px solid black;
	width: 10px;
	margin: 3px 0;
	transition: 0.4s;
`;
const Hamburger = () => (
	<div>
		<Line />
		<Line />
		<Line />
	</div>
);

export default Footer;
