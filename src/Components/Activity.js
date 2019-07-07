import React from 'react';
import parseJsonResponse from './Utilities/JsonParser';

function getActivites() {
	fetch('/all')
		.then(parseJsonResponse)
		.then(res => console.log(res))
		.catch(err => console.log(err));
}

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

function save() {
	alert('Simulate Save');
}

/**
 * Enables Next Sibling if Checked
 * @param {*} event
 */
function handleCheck(event) {
	if (event.target.checked) {
		event.target.nextSibling.disabled = false;
	} else {
		event.target.nextSibling.disabled = true;
	}
}

function updateActivity() {
	let name = 'Something';
	let streak = 1;
	let username = 'Somebody';
	let nonzero = '2019-06-27T05:00:00.000Z';
	let last = '2019-07-06T05:00:00.000Z';
	let x = { name, streak, username, nonzero, last };
	return fetch('/api/update', {
		method: 'PUT',
		body: JSON.stringify(x),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const RefreshButton = () => (
	<button onClick={getActivites}>Get Activities</button>
);

const TestButton = () => <button onClick={updateActivity}>Test Update</button>;

// Title, Checkbox, Save Button, Streak Counter, Last 0 Day Reminder
// Could be Form
// Disappear after Saving or Submitting
/**
 *
 * @param {{name: string, streak: number, last: Date}} props
 * @returns Title, Checkbox, Save Button, Streak Counter, Lasy 0 Day Reminder
 */
const ActivityDisplay = props => (
	<div style={{ border: '1px solid black' }}>
		<div>{props.name}</div>
		<input
			type="checkbox"
			id={props.name + '-checkbox'}
			onChange={handleCheck}
		/>
		<button onClick={save} disabled>
			Save
		</button>
		<div>Streak: {props.streak}</div>
		<div>Last Zero Day: {props.last}</div>
	</div>
);

/**
 * Iterates through array of activities & passes to ActivityDisplay()
 * @param {[{}]} props
 */
const Activities = props => {
	return (
		<React.Fragment>
			<RefreshButton />
			<TestButton />
			{props.activities.map(act => ActivityDisplay(act))}
		</React.Fragment>
	);
};

export default Activities;
