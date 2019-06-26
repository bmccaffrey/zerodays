require('dotenv').config({ path: '.env.local' });
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const PGClient = require('../server/db');
const User = require('./User');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/api/authenticate', async (req, res) => {
	const { email, password } = req.body;
	// validate params
	const user = User.getUser(email);
	// add conditional: if (!user) { res.status(404).json({error: User not found})}
	user.verify(password); // call if passes check
	// create and issue JWT
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
