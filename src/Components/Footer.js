import React, { Component } from 'react';
import styled from 'styled-components';
import AddCircle from './Icons/AddCircle.svg';
import HamburgerIcon from './Icons/Hamburger.svg';
import Menu from './Menu';

export default class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			on: false,
			content: ''
		};
		this.toggle = this.toggle.bind(this);
		this.displayMenu = this.displayMenu.bind(this);
	}

	toggle() {
		this.setState({ on: !this.state.on });
	}
	displayMenu() {
		this.toggle();
		this.setState({ content: <Menu page={this.props.page} /> });
	}

	render() {
		const { on, content } = this.state;
		return (
			<StyledFooter>
				{on ? (
					content
				) : (
					<FlexContainer>
						<img
							src={HamburgerIcon}
							alt="menu icon"
							onClick={this.displayMenu}
						/>
						<img src={AddCircle} alt="add button" />
						<span>No Zero Days</span>
					</FlexContainer>
				)}
			</StyledFooter>
		);
	}
}

const StyledFooter = styled.footer`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 2.5rem;
`;
const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0px 15px;
`;
