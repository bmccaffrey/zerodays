import React from 'react';

function logout() {
	fetch('/removeToken')
		.then(res => {
			if (res.status === 200) {
				console.log('Should be removed');
			} else {
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
			<button onClick={logout}>Logout</button>
		</React.Fragment>
	);
};

export default LogoutButton;
