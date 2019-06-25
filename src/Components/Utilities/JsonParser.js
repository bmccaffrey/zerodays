export default function parseJsonResponse(resp) {
	if (resp.ok) {
		return resp.json();
	}
	return resp
		.json()
		.catch(err => {
			return Promise.reject('Unexpected error occurred'); // eslint-disable-line prefer-promise-reject-errors
		})
		.then(err => {
			throw err;
		});
}
