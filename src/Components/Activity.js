import React from 'react';
import parseJsonResponse from './Utilities/JsonParser';

function getActivites() {
	fetch('/all')
		.then(parseJsonResponse)
		.then(res => console.log(res))
		.catch(err => console.log(err));
}

function save() {
	alert('Simulate Save');
}

function handleCheck(event) {
	if (event.target.checked) {
		event.target.nextSibling.disabled = false;
	} else {
		event.target.nextSibling.disabled = true;
	}
}

const RefreshButton = () => (
	<button onClick={getActivites}>Get Activities</button>
);

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

const Activities = props => {
	return (
		<React.Fragment>
			{props.activities.map(act => ActivityDisplay(act))}
		</React.Fragment>
	);
};

export default Activities;
