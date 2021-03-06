require('dotenv').config({ path: '.env.local' });
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('../server/db');
const User = require('./User');
const Auth = require('./auth');
const Activity = require('./Activity');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/home', (req, res) => {
	res.send('Welcome!');
});

app.get('/api/secret', Auth.withAuth, (req, res) => {
	res.send('The password is password');
});

app.get('/all', async (req, res) => {
	try {
		const { rows } = await db.query('SELECT * FROM activity;');
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
	try {
		const activity = new Activity(req.body);
		await activity.update();
		return res.sendStatus(200);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: 'Unable to update activity' });
	}
});

app.post('/api/create', Auth.withAuth, async (req, res) => {
	const { name } = req.body;
	const { email } = req;
	try {
		await Activity.create(name, email);
		return res.status(201).send(name + ' added!');
	} catch (e) {
		console.error(e);
		return res
			.status(500)
			.json({ error: 'This is a poorly constructed error message' });
	}
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
