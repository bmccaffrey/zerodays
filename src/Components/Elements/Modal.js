import React, { Component } from 'react';
import Portal from '../Utilities/Portal';
import styled from 'styled-components';

const ModalWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
`;
const ModalCard = styled.div`
	background: white;
	border-radius: 5px;
	padding: 40px 15px 15px 15px;
	color: black;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
	transition: 'all' '0.3s' 'ease';
	margin-bottom: 100px;
	min-width: 270px;
	position: relative;
	z-index: 10;
`;
const CloseButton = styled.button`
	background: transparent;
	border: none;
	padding: 10px;
	position: absolute;
	top: 0;
	right: 0;
`;
const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	background: white;
	height: 100%;
	opacity: 0.5;
	width: 100%;
`;

export default class Modal extends Component {
	render() {
		const { children, toggle, on } = this.props;
		return (
			<Portal>
				{on && (
					<ModalWrapper>
						<ModalCard>
							<CloseButton onClick={toggle}>Close</CloseButton>
							<div>{children}</div>
						</ModalCard>
						<Background onClick={toggle} />
					</ModalWrapper>
				)}
			</Portal>
		);
	}
}
