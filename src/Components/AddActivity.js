import React from 'react';
import Save from './Icons/Save.svg';
import Cancel from './Icons/Cancel.svg';
import styled from 'styled-components';
import AddCircle from './Icons/AddCircle.svg';
import Toggle from './Utilities/Toggle';
import Modal from './Elements/Modal';

const AddActivity = () => {
	return (
		<div>
			<Toggle>
				{({ on, toggle }) => (
					<>
						<img src={AddCircle} alt="add activity button" onClick={toggle} />
						<Modal on={on} toggle={toggle}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<GridContainer>
									<input
										type="text"
										name="activityName"
										autoFocus
										placeholder="Activity Name"
										style={{
											border: '1px solid black',
											gridColumnStart: 1,
											gridColumnEnd: 4
										}}
									/>
									<img
										src={Cancel}
										alt="cancels button"
										style={{ gridColumnStart: 2, gridColumnEnd: 3 }}
									/>
									<img
										src={Save}
										alt="save button"
										style={{ gridColumnStart: 3, gridColumnEnd: 4 }}
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
