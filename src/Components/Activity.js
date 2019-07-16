import React, { Component } from 'react';
import parseJsonResponse from './Utilities/JsonParser';
import styled from 'styled-components';
import Footer from './Footer';

export default class ActivitiesController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			busy: true,
			feedback: '',
			completed: true,
			results: []
		};
		this.getActivities = this.getActivities.bind(this);
		this.displayError = this.displayError.bind(this);
		this.displayUnknownErrorMsg = this.displayUnknownErrorMsg.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.updateActivity = this.updateActivity.bind(this);
		this.getActivityFromEvent = this.getActivityFromEvent.bind(this);
	}

	componentDidMount() {
		this.getActivities()
			.then(resp => {
				this.setState({ busy: false, completed: true, results: resp });
			})
			.catch(err => {
				console.error(err);
				this.setState({ busy: false, feedback: err, completed: false });
			});
	}

	async getActivities() {
		return fetch('/all').then(parseJsonResponse);
	}

	displayError() {
		if (this.state.completed && this.state.feedback.length) {
			return <div>{this.state.feedback}</div>;
		}
	}

	displayUnknownErrorMsg() {
		const notBusy = !this.state.busy;
		const isCompleted = this.state.completed;
		const noErrorMsg = this.state.feedback.length >= 1;
		const noResults = this.state.results.length <= 1;
		if (notBusy && isCompleted && noErrorMsg && noResults) {
			return <h1>An unknown error has occurred.</h1>;
		}
	}

	getActivityFromEvent(event) {
		const checkboxId = event.target.id;
		const name = checkboxId.split('-')[0];
		let { results } = this.state;
		const activity = results.find(elm => elm.name === name);
		return activity;
	}

	/**
	 * POST with activity to update DB
	 * @param {*} activityObject stuff
	 * @returns {*} Promise: fetch
	 */
	updateActivity(activityObject) {
		return fetch('/api/update', {
			method: 'PUT',
			body: JSON.stringify(activityObject),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	async handleCheck(event) {
		let activity = await this.getActivityFromEvent(event);
		if (!activity) {
			throw new Error('unable to get activity from event id');
		}
		this.updateActivity(activity)
			.then(() => {
				console.log('Updated');
			})
			.catch(err => {
				console.error(err);
				const errorMsg = err.message || 'Unable to update your activity';
				this.setState({ feedback: errorMsg });
			});
	}

	displayActivity(stuff) {
		return (
			<Row key={stuff.id}>
				<div style={{ marginRight: 10 }}>
					<Checkbox id={stuff.name + '-checkbox'} onChange={this.handleCheck} />
				</div>
				<div style={{ fontSize: 20 }}>{stuff.name}</div>
			</Row>
		);
	}

	render() {
		return (
			<div>
				{this.displayError()}
				{this.displayUnknownErrorMsg()}
				{this.state.results.length >= 1 &&
					this.state.results.map(activity => this.displayActivity(activity))}
				<Footer page="todo" />
			</div>
		);
	}
}

const Row = styled.div`
	margin: 15px 0px 0px 10px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const Checkbox = styled.input.attrs({
	type: 'checkbox'
})`
	height: 20px;
	width: 20px;
`;
