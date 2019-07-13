import React from 'react';
import HamburgerIcon from './Icons/Hamburger.svg';
import Toggle from './Utilities/Toggle';
import Modal from './Elements/Modal';
const Hamburger = () => (
	<Toggle>
		{({ on, toggle }) => (
			<div>
				<Modal on={on} toggle={toggle}>
					<div>Test</div>
				</Modal>
				<img src={HamburgerIcon} alt="menu icon" onClick={toggle} />
			</div>
		)}
	</Toggle>
);

export default Hamburger;
