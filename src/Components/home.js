import React, { Component } from 'react';
import parseJsonResponse from './Utilities/JsonParser';

export default class AreaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			feedback: ''
		};
		this.getActivities = this.getActivities.bind(this);
		this.displayActivities = this.displayActivities.bind(this);
	}

	componentDidMount() {
		this.getActivities()
			.then(resp => {
				this.setState({ results: resp });
			})
			.catch(err => {
				console.error(err);
				this.setState({ feedback: err });
			});
	}

	async getActivities() {
		return fetch('/all').then(parseJsonResponse);
	}

	displayActivities(activity) {
		return <div>{activity.name}</div>;
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
				{this.state.feedback && <h1>{this.state.feedback}</h1>}
				{this.state.results.length > 0 &&
					this.state.results.map(activity => this.displayActivities(activity))}
			</div>
		);
	}
}
