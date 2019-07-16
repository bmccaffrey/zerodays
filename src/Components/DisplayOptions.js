import React from 'react';
import styled from 'styled-components';
import EditIcon from './Icons/Edit.svg';
import DeleteIcon from './Icons/Delete.svg';
import Toggle from './Utilities/Toggle';
import VerticalOptions from './Icons/Options.svg';

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;
const Options = styled.img`
	grid-column-start: 3;
	grid-column-end: 4;
`;
const Edit = styled.img`
	grid-column-start: 1;
	grid-column-end: 2;
`;
const Delete = styled.img`
	grid-column-start: 2;
	grid-column-end: 3;
`;

const DisplayOptions = () => (
	<Toggle>
		{({ on, toggle }) => (
			<GridContainer>
				{on && (
					<>
						<Edit src={EditIcon} alt="edit icon" />
						<Delete src={DeleteIcon} alt="delete icon" />
					</>
				)}
				<Options src={VerticalOptions} alt="option icon" onClick={toggle} />
			</GridContainer>
		)}
	</Toggle>
);

export default DisplayOptions;
