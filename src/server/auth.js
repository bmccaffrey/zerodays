require('dotenv').config({ path: '.env.local' });
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function createToken(email) {
	const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
	return token;
}

async function withAuth(req, res, next) {
	try {
		const token =
			req.body.token ||
			req.query.token ||
			req.headers['x-access-token'] ||
			req.cookies.token;
		const decoded = jwt.verify(token, secret);
		req.email = decoded.email;
		next();
	} catch (e) {
		console.error(e.message);
		let errorMessage;
		if (e.message === 'jwt must be provided') {
			errorMessage = 'Unauthorized: No token provided';
		} else if (e.message === 'invalid signature') {
			errorMessage = 'Unauthorized: Invalid token';
		} else {
			errorMessage = 'An unexpected error occurred';
		}
		res.status(401).send(errorMessage);
	}
}

module.exports = { createToken, withAuth };
