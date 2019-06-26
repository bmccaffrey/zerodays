require('dotenv').config({ path: '.env.local' });
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function createToken(email) {
	const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
	return token;
}
function withAuth(req, res, next) {
	const token =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.cookies.token;

	if (!token) {
		res.status(401).send('Unauthorized: No token provided');
	} else {
		jwt
			.verify(token, secret)
			.then(decoded => {
				req.email = decoded.email;
				next();
			})
			.catch(() => {
				res.status(401).send('Unauthorized: Invalid token');
			});
	}
}

module.exports = { createToken, withAuth };
