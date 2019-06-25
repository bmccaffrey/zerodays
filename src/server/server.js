require('dotenv').config({ path: '.env.local' });
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const PGClient = require('../server/db');

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

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
