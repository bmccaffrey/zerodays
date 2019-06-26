require('dotenv').config({ path: '.env.local' });
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function createToken(email) {
	const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
	return token;
}

module.exports = { createToken };
