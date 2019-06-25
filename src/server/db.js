require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const PGClient = new Client({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
});

module.exports = PGClient;
