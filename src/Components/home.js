import React, { Component } from 'react';
import parseJsonResponse from './Utilities/JsonParser';
import Accordion from './Utilities/Accordion';
import ChevronRight from './Icons/ChevronRight.svg';
import ChevronDown from './Icons/ChevronDown.svg';
import Footer from './Footer';
import Options from './Icons/Options.svg';

const formatDate = date => {
	const copy = new Date(date);
	return copy.toDateString();
};

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
		return (
			<Accordion key={activity.id}>
				<div
					style={{
						clear: 'left',
						margin: '15px 0px',
						height: 24
					}}
				>
					<img
						src={ChevronRight}
						alt="arrow to expand content"
						style={{ float: 'left', marginRight: 10 }}
					/>
					<span style={{ verticalAlign: 'middle' }}>{activity.name}</span>
					<img src={Options} alt="options icon" style={{ float: 'right' }} />
				</div>
				<div style={{ marginLeft: '15px' }}>Streak: {activity.streak} days</div>
				<div style={{ marginLeft: '15px' }}>
					Last Entry: {formatDate(activity.last)}
				</div>
			</Accordion>
		);
	}

	render() {
		return (
			<div>
				<h1>Home</h1>
				{this.state.feedback && <h1>{this.state.feedback}</h1>}
				{this.state.results.length > 0 &&
					this.state.results.map(activity => this.displayActivities(activity))}
				<Footer page="home" />
			</div>
		);
	}
}
