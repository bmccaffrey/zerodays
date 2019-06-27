import React, { Component } from 'react';

export default class AreaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'Loading...'
		};
	}

	componentDidMount() {
		fetch('/api/home')
			.then(res => res.text())
			.then(res => this.setState({ message: res }));
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
				<p>{this.state.message}</p>
			</div>
		);
	}
}
