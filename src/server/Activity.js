const db = require('../server/db');

class Activity {
	constructor(object) {
		const { id, name, streak, last, username } = object;
		this._id = id;
		this.name = name;
		this.streak = streak;
		this.last = last;
		this.username = username;
	}

	isZeroDay() {
		let lastDayRecorded = new Date(this.last);
		let today = new Date();
		const msInDay = 3600000;
		let diff = today - lastDayRecorded;
		let hoursDiff = diff / msInDay;
		return hoursDiff >= 48;
	}

	updateStreak() {
		const shouldResetStreak = this.isZeroDay();
		if (shouldResetStreak) {
			this.streak = 1;
		} else {
			this.streak += 1;
		}
	}

	async update() {
		try {
			this.updateStreak();
			const today = new Date().toISOString();
			const text =
				'UPDATE activity SET streak = ($1), last = ($2) WHERE name = ($3) AND username = ($4)';
			const values = [this.streak, today, this.name, this.username];
			await db.query(text, values);
		} catch (e) {
			console.error(e);
		}
	}
	static async create(name, email) {
		try {
			const text = 'INSERT INTO activity (name, username) VALUES (($1), ($2))';
			const values = [name, email];
			await db.query(text, values);
		} catch (e) {
			console.error(e);
		}
	}

	static async delete(id, name, email) {
		try {
			const text =
				'DELETE FROM activity WHERE id = ($1), name = ($2), username = ($3)';
			const values = [id, name, email];
			await db.query(text, values);
		} catch (e) {
			console.error(e);
		}
	}

	async updateName(name) {
		const text =
			'UPDATE activity SET name = ($1) WHERE id = ($2), name = ($3), username = ($4)';
		const values = [name, this._id, this.name, this.username];
		await db.query(text, values);
	}
}

module.exports = Activity;
