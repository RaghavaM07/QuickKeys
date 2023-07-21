const mongoose = require('mongoose')

const highscoreSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	resultId: {
		type: mongoose.Types.ObjectId,
		ref: 'Result'
	}
})

module.exports = mongoose.model('Highscore', highscoreSchema)