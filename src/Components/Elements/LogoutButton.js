import React from 'react';
import { Link } from 'react-router-dom';
import StyledLink from './StyledLink';

function logout() {
	fetch('/removeToken')
		.then(res => {
			if (res.status === 200) {
				console.log('Should be removed');
			} else {
				alert('Unable to logout');
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => {
			console.error(err);
		});
}

const LogoutButton = () => {
	return (
		<React.Fragment>
			<button onClick={logout} style={{ background: 'white' }}>
				<StyledLink to="/login">Logout</StyledLink>
			</button>
		</React.Fragment>
	);
};

export default LogoutButton;
