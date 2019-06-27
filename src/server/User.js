const bcrypt = require('bcrypt');
const saltRounds = 10;
const PGClient = require('../server/db');

class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
		// this.hashedPassword = undefined;
	}

	save() {
		bcrypt.hash(this.password, saltRounds).then(hash => {
			this.password = hash;
		});
	}

	/** Verify Correct Password
	 *
	 * @param {string} password
	 */
	async verify(password) {
		try {
			const hash = this.password;
			const isCorrect = await bcrypt.compare(password, hash);
			console.log('SUCCESS');
			return isCorrect;
		} catch (e) {
			console.error(e);
		}
	}

	/** Verify User Exists
	 *
	 * @param {string} email
	 */
	static async getUser(email) {
		try {
			const text = 'SELECT * FROM users WHERE email = ($1)';
			const values = [email];
			const { rows } = await PGClient.query(text, values);
			const { password } = rows[0];
			return new User(email, password);
		} catch (e) {
			console.error(e);
		}
	}
}

module.exports = User;
