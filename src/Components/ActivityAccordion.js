import React from 'react';
import styled from 'styled-components';
import Toggle from './Utilities/Toggle';
import ChevronRight from './Icons/ChevronRight.svg';
import ChevronDown from './Icons/ChevronDown.svg';
import VerticalOptions from './Icons/Options.svg';
import HorizontalOptions from './Icons/OptionsHorizontal.svg';

const ActivityRow = styled.div`
	clear: left;
	margin: 15px 0px;
	height: 24px;
`;
const Chevron = styled.img`
	float: left;
	margin-right: 10px;
`;
const Options = styled.img`
	float: right;
	margin-right: 15px;
`;

const formatDate = date => {
	const copy = new Date(date);
	return copy.toDateString();
};

const ActivityAccordion = ({ activity }) => (
	<Toggle>
		{({ on, toggle }) => (
			<div>
				<ActivityRow onClick={toggle}>
					<Chevron
						src={on ? ChevronDown : ChevronRight}
						alt={
							on
								? 'arrow indicating expanded content'
								: 'arrow indicating expandable content'
						}
					/>
					<span style={{ verticalAlign: 'middle' }}>{activity.name}</span>
					<Options
						src={on ? HorizontalOptions : VerticalOptions}
						alt="options icon"
					/>
				</ActivityRow>
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
