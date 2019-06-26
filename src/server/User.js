const bcrypt = require('bcrypt');
const saltRounds = 10;
class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.hashedPassword = bcrypt.hash(password, saltRounds);
	}

	save() {
		bcrypt.hash(this.password, saltRounds).then(hash => {
			this.hashedPassword = hash;
		});
	}

	verify(password) {
		let hash = this.hashedPassword;
		bcrypt
			.compare(password, hash)
			.then(function(res) {
				console.log(res);
			})
			.catch(err => console.log(err));
	}
}

module.exports = User;
