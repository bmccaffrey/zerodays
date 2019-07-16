import React from 'react';
import styled from 'styled-components';
import Toggle from './Utilities/Toggle';
import ChevronRight from './Icons/ChevronRight.svg';
import ChevronDown from './Icons/ChevronDown.svg';
import VerticalOptions from './Icons/Options.svg';
import HorizontalOptions from './Icons/OptionsHorizontal.svg';
import DisplayOptions from './DisplayOptions';

const ActivityRow = styled.div`
	clear: left;
	margin: 15px 0px;
	height: 24px;
`;
const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 120px;
	margin: 15px 0px;
`;
const SubGrid = styled.div`
	display: grid;
	grid-template-columns: 30px 1fr;
`;
const Chevron = styled.img`
	grid-column-start: 1;
	grid-column-end: 2;
`;
const Options = styled.img`
	grid-column-start: 3;
	grid-column-end: 4;
`;

const formatDate = date => {
	const copy = new Date(date);
	return copy.toDateString();
};

function sayHi() {
	console.log('hi');
}

const ActivityAccordion = ({ activity }) => (
	<Toggle>
		{({ on, toggle }) => (
			<div>
				<GridContainer>
					<SubGrid onClick={toggle}>
						<Chevron
							src={on ? ChevronDown : ChevronRight}
							alt={
								on
									? 'arrow indicating expanded content'
									: 'arrow indicating expandable content'
							}
						/>
						<span style={{ verticalAlign: 'middle' }}>{activity.name}</span>
					</SubGrid>
					<DisplayOptions />
					{/* <Options
						src={on ? HorizontalOptions : VerticalOptions}
						alt="options icon"
						onClick={sayHi}
					/> */}
				</GridContainer>
				{on && (
					<>
						<div style={{ marginLeft: '15px' }}>
							Streak: {activity.streak} days
						</div>
						<div style={{ marginLeft: '15px' }}>
							Last Entry: {formatDate(activity.last)}
						</div>
					</>
				)}
			</div>
		)}
	</Toggle>
);

export default ActivityAccordion;
