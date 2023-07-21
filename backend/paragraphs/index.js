module.exports.getPara = function (difficulty) {
	if (difficulty === 'EASY') {
		const easyArr = require('./easy')
		const randomIndex = Math.floor(Math.random() * easyArr.length);
		return easyArr[randomIndex];
	}
	if (difficulty === 'MEDIUM') {
		const medArr = require('./medium')
		const randomIndex = Math.floor(Math.random() * medArr.length);
		return medArr[randomIndex];
	}
	if (difficulty === 'HARD') {
		const hardArr = require('./hard')
		const randomIndex = Math.floor(Math.random() * hardArr.length);
		return hardArr[randomIndex];
	}
}