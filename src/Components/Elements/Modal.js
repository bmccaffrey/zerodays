import React, { Component } from 'react';
import Portal from '../Utilities/Portal';

export default class Modal extends Component {
	render() {
		const { children, toggle, on } = this.props;
		return (
			<Portal>
				{on && (
					<div>
						<div>{children}</div>
						<button onClick={toggle}>Close</button>
					</div>
				)}
			</Portal>
		);
	}
}
