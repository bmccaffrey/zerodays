	/**
	 * Increment streak, if nonzero is present & isn't a zeroday.
	 * Set streak to 1, otherwise.
	 * Sets streak based on the value of nonzero
	 * @param {*} activity
	 * @returns {*} clonedActivity
	 */
	updateStreak(activity) {
		let { nonzero, streak } = activity;
		let clonedActivity = deepClone(activity);
		const currentStreak = nonzero && !isZeroDay(nonzero) ? streak + 1 : 1;
		clonedActivity.streak = currentStreak;
		return clonedActivity;
	}

	/**
 * Determine if has been > 1 Day Since Progressing
 * @param {Date} dateFromProps
 * @returns {boolean} Diff > 48 Hours
 */
function isZeroDay(dateFromProps) {
	let lastNonZeroDay = new Date(dateFromProps);
	let today = new Date();
	const msInDay = 3600000;
	let diff = today - lastNonZeroDay;
	let hoursDiff = diff / msInDay;
	return hoursDiff >= 48;
}

function deepClone(object) {
	return JSON.parse(JSON.stringify(object));
}