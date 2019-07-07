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

app.get('/api/home', (req, res) => {
	res.send('Welcome!');
});

app.get('/api/secret', Auth.withAuth, (req, res) => {
	res.send('The password is password');
});

app.get('/all', async (req, res) => {
	try {
		const { rows } = await PGClient.query('SELECT * FROM activity;');
		console.log(rows);
		res.send(rows);
	} catch (e) {
		console.error(e);
	}
});

app.post('/api/authenticate', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.getUser(email);
		const correctPassword = await user.verify(password);
		const token = await Auth.createToken(email);
		return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
	} catch (e) {
		console.error(e);
		return res.status(401).json({ error: 'Incorrect credentials' });
	}
});

app.get('/api/secret', Auth.withAuth, async (req, res) => {
	res.send('Test');
});

app.get('/checkToken', Auth.withAuth, async (req, res) => {
	res.sendStatus(200);
});

app.get('/removeToken', Auth.withAuth, async (req, res) => {
	res.clearCookie('token').sendStatus(200);
});

app.put('/api/update', async (req, res) => {
	let { name, streak, username, nonzero, last } = req.body;
	const commandAndTable = 'UPDATE activity ';
	let setClause = 'SET streak = ($1), ';
	const whereClause = ' WHERE name = ($3) AND username = ($4)';
	const today = new Date().toISOString();

	let determineField = streak
		? (() => {
				streak++;
				return 'nonzero = ($2)';
		  })()
		: 'last = ($2)';
	setClause += determineField;
	const updateStatement = commandAndTable + setClause + whereClause;

	res.status(200).send(updateStatement);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
