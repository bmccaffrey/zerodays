import React, { useState } from 'react';
import Save from './Icons/Save.svg';
import Cancel from './Icons/Cancel.svg';
import styled from 'styled-components';
import AddCircle from './Icons/AddCircle.svg';
import Toggle from './Utilities/Toggle';
import Modal from './Elements/Modal';

function verifyFetch(resp) {
	if (resp.ok) {
		return resp;
	}
	return resp
		.catch(() => {
			return Promise.reject('Unexpected error occurred');
		})
		.then(err => {
			throw err;
		});
}

const AddActivity = () => {
	const [name, setName] = useState('');
	const [status, setStatus] = useState('');

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
		setStatus();
		post()
			.then(verifyFetch)
			.then(() => {
				setStatus('success');
			})
			.catch(err => {
				console.error(err);
				setStatus('error');
			});
	}

	return (
		<div>
			<Toggle>
				{({ on, toggle }) => (
					<>
						<img src={AddCircle} alt="add activity button" onClick={toggle} />
						<Modal on={on} toggle={toggle}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								{status === 'success' ? (
									<h1>Success!</h1>
								) : (
									<GridContainer>
										<h2
											style={{
												gridColumnStart: 1,
												gridColumnEnd: 4,
												textAlign: 'center',
												marginTop: 0
											}}
										>
											{status === 'error'
												? 'An unexpected error occurred'
												: 'Add New Activity'}
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
								)}
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
