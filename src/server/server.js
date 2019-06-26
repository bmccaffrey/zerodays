require('dotenv').config({ path: '.env.local' });
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PGClient = require('../server/db');
const User = require('./User');
const Auth = require('./auth');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to DB
PGClient.connect();

app.get('/all', async (req, res) => {
	try {
		const { rows } = await PGClient.query('SELECT * FROM activity;');
		console.log(rows);
		res.send(rows);
	} catch (e) {
		console.error(e);
	}
});

// probably should wrap in try / catch
app.post('/api/authenticate', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.getUser(email);
	const correctPassword = await user.verify(password);
	if (user && correctPassword) {
		const token = await Auth.createToken(email);
		return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
	}
	return res.status(401).json({ error: 'Incorrect credentials' });
});

app.get('/api/secret', Auth.withAuth, async (req, res) => {
	res.send('Test');
});

app.get('/checkToken', Auth.withAuth, async (req, res) => {
	res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
