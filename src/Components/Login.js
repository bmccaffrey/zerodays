import React, { Component } from 'react';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	onSubmit(event) {
		event.preventDefault();
		alert('Authenticating');
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<h1>Login</h1>
					<input
						type="email"
						name="email"
						placeholder="Enter Email"
						value={this.state.email}
						onChange={this.handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter Password"
						value={this.state.password}
						onChange={this.handleChange}
						required
					/>
					<button type="submit">Login</button>
				</form>
			</div>
		);
	}
}
