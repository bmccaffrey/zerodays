import React, { Component } from 'react';
import parseJsonResponse from './Utilities/JsonParser';

/**
 * Determine if has been > 1 Day Since Progressing
 * @param {Date} dateFromProps
 * @returns {boolean} Diff > 48 Hours
 */
function isZeroDay(dateFromProps) {
	let lastNonZeroDay = new Date(dateFromProps);
	let today = new Date();
	const msInDay = 3600000;
	let diff = today - lastNonZeroDay;
	let hoursDiff = diff / msInDay;
	return hoursDiff >= 48;
}

function deepClone(object) {
	return JSON.parse(JSON.stringify(object));
}

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
		this.thankYouForWaiting = this.thankYouForWaiting.bind(this);
		this.displayError = this.displayError.bind(this);
		this.displayUnknownErrorMsg = this.displayUnknownErrorMsg.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.save = this.save.bind(this);
		this.updateActivity = this.updateActivity.bind(this);
		this.getActivityFromEvent = this.getActivityFromEvent.bind(this);
		this.updateStreak = this.updateStreak.bind(this);
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

	thankYouForWaiting() {
		if (this.state.busy) {
			return <h1>Fetching your data</h1>;
		}
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
	 * Increment streak, if nonzero is present & isn't a zeroday.
	 * Set streak to 1, otherwise.
	 * Sets streak based on the value of nonzero
	 * @param {*} activity
	 * @returns {*} clonedActivity
	 */
	updateStreak(activity) {
		let { nonzero, streak } = activity;
		let clonedActivity = deepClone(activity);
		const currentStreak = nonzero && !isZeroDay(nonzero) ? streak + 1 : 1;
		clonedActivity.streak = currentStreak;
		return clonedActivity;
	}

	async handleCheck(event) {
		let activity = await this.getActivityFromEvent(event);
		if (!activity) {
			throw new Error('unable to get activity from event id');
		}
		const updatedActivity = this.updateStreak(activity);
		this.updateActivity(updatedActivity)
			.then(() => {
				console.log('Updated');
			})
			.catch(err => {
				console.error(err);
				const errorMsg = err.message || 'Unable to update your activity';
				this.setState({ feedback: errorMsg });
			});
	}

	save() {
		console.log('test');
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

	displayActivity(stuff) {
		return (
			<div style={{ border: '1px solid black' }} key={stuff.id}>
				<div>{stuff.name}</div>
				<input
					type="checkbox"
					id={stuff.name + '-checkbox'}
					onChange={this.handleCheck}
				/>
				<button onClick={this.save} disabled>
					Save
				</button>
				<div>Streak: {stuff.streak}</div>
				<div>Last Zero Day: {stuff.last}</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.thankYouForWaiting()}
				{this.displayError()}
				{this.displayUnknownErrorMsg()}
				{this.state.results.length >= 1 &&
					this.state.results.map(activity => this.displayActivity(activity))}
			</div>
		);
	}
}
