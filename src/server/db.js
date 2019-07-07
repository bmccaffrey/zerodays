require('dotenv').config({ path: '.env.local' });

const { Pool } = require('pg');
const PGPool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
});
module.exports = {
	query: (text, params) => PGPool.query(text, params)
};
