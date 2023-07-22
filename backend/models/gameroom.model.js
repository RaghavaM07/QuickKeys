const mongoose = require('mongoose')

const gameroomSchema = mongoose.Schema({
	creator: {
		type: String,
		required: true
	},
	roomId: {
		type: String,
		required: true
	},
	startBy: {
		type: Date,
		default: () => Date.now() + 60*1000
	},
	endBy: {
		type: Date,
		required: true
	},
	para: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Gameroom', gameroomSchema)