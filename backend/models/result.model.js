const mongoose = require('mongoose')

const resultSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username required"]
	},
	accuracy: {
		type: Number,
		required: [true, "Accuracy required"]
	},
	speed: {
		type: Number,
		required: [true, "Speed in wpm required"]
	}
})

module.exports = mongoose.model('Result', resultSchema)
