import React, { useState, useEffect } from 'react';
import Save from './Icons/Save.svg';
import Cancel from './Icons/Cancel.svg';
import styled from 'styled-components';
import AddCircle from './Icons/AddCircle.svg';
import Toggle from './Utilities/Toggle';
import Modal from './Elements/Modal';

const AddActivity = () => {
	const [name, setName] = useState('');
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function post() {
		return fetch('/api/create', {
			method: 'POST',
			body: JSON.stringify({ name }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	function createActivity() {
		setIsLoading(true);
		post()
			.then(() => {
				console.log('Created');
				setIsError(false);
			})
			.catch(err => {
				console.error(err);
				setIsError(true);
			})
			.finally(() => setIsLoading(false));
	}

	return (
		<div>
			<Toggle>
				{({ on, toggle }) => (
					<>
						<img src={AddCircle} alt="add activity button" onClick={toggle} />
						<Modal on={on} toggle={toggle}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								{isError && <h1>An unexpected error occurred.</h1>}
								{isLoading && <h1>Loading</h1>}
								<GridContainer>
									<h2
										style={{
											gridColumnStart: 1,
											gridColumnEnd: 4,
											textAlign: 'center',
											marginTop: 0
										}}
									>
										Add New Activity
									</h2>
									<input
										type="text"
										value={name}
										name="activityName"
										autoFocus
										placeholder="Activity Name"
										style={{
											border: '1px solid black',
											gridColumnStart: 1,
											gridColumnEnd: 4
										}}
										onChange={e => setName(e.target.value)}
									/>
									<img
										src={Cancel}
										alt="cancels button"
										style={{ gridColumnStart: 2, gridColumnEnd: 3 }}
										onClick={toggle}
									/>
									<img
										src={Save}
										alt="save button"
										style={{ gridColumnStart: 3, gridColumnEnd: 4 }}
										onClick={() => createActivity()}
									/>
								</GridContainer>
							</div>
						</Modal>
					</>
				)}
			</Toggle>
		</div>
	);
};

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 150px 25px 25px;
	column-gap: 15px;
	row-gap: 5px;
`;

export default AddActivity;
