class Activity {
	constructor(object) {
		const { name, streak, last, username } = object;
		this.name = name;
		this.streak = streak;
		this.last = last;
		this.username = username;
	}
	isZeroDay() {
		let lastDayRecorded = new Date(this.last);
		let today = new Date();
		const msInDay = 3600000;
		let diff = today - lastNonZeroDay;
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
}

module.exports = Activity;
