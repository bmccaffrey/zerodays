import React, { Component } from 'react';
import parseJsonResponse from './Utilities/JsonParser';

export default class AreaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			busy: false,
			completed: false,
			feedback: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.post = this.post.bind(this); // not sure this is needed
		this.submit = this.submit.bind(this);
	}

	handleChange(event) {
		this.setState({ name: event.target.value });
	}

	async post() {
		let uri, body;

		await fetch(uri, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		}).then(parseJsonResponse);

		this.setState({ completed: true });
	}
	submit(event) {
		event.preventDefault();
		this.post()
			.catch(err => {
				this.setState({ feedback: err || 'Unexpected error occurred' });
			})
			.finally(() => {
				this.setState({ busy: false });
			});
		this.setState({ completed: true });
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submit}>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						onChange={this.handleChange}
						value={this.state.name}
						required
					/>
					<button type="submit">Save</button>
					<button>Clear</button>
				</form>
			</div>
		);
	}
}
