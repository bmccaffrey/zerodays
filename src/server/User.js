const bcrypt = require('bcrypt');
const saltRounds = 10;
const PGClient = require('../server/db');

class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.hashedPassword = undefined;
	}

	save() {
		bcrypt.hash(this.password, saltRounds).then(hash => {
			this.hashedPassword = hash;
		});
	}

	/** Verify Correct Password
	 *
	 * @param {string} password
	 */
	verify(password) {
		let hash = this.hashedPassword;
		bcrypt
			.compare(password, hash)
			.then(function(res) {
				console.log(res);
			})
			.catch(err => console.log(err));
	}

	/** Verify User Exists
	 *
	 * @param {string} email
	 */
	static getUser(email) {
		const text = 'SELECT * FROM users WHERE email = ($1)';
		const values = [email];
		PGClient.query(text, values)
			.then(res => {
				let results = res.rows[0];
				if (!results) {
					console.log('Return an Error Message');
				} else {
					console.log(results);
					const { password } = res.rows[0];
					this.hashedPassword = password;
				}
			})
			.catch(err => console.log(err));
	}
}

module.exports = User;
