require('dotenv').config()
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const { generateUsername } = require("unique-username-generator");

const connectDB = require('./connectDB')
const Result = require('./models/result.model')
const Highscore = require('./models/highscores.model')

app.use(express.json())

app.get('/api/newUsername', (req, res) => {
	const username = generateUsername("", 3)
	res.json({ username })
})

app.get('/api/newRoom', (req, res) => {
	const roomId = uuidv4()
	// do session mgmt
	res.json({ roomId })
})

app.post('/api/getText', (req, res) => {
	const par = require('./paragraphs')
	res.json({ paragraph: par.getPara(req.body.difficulty) })
})

app.post('/api/result', async (req, res) => {
	const { username, accuracy, speed } = req.body

	const result = await Result.create({ username, accuracy, speed })

	const currHigh = await Highscore.findOne({ username }).populate({
		path: 'resultId'
	})

	if (currHigh === null) {
		await Highscore.create({ username, resultId: result._id })
	} else if (currHigh.speed <= result.speed) {
		currHigh.resultId = result._id
		await currHigh.save()
	}

	res.json(result)
})

app.get('/api/leaderboard', async (req, res) => {
	const leaderboard = await Highscore
		.find({})
		.populate({ path: 'resultId' })

	res.json(leaderboard.sort((a, b) => b.resultId.speed - a.resultId.speed))
})

const PORT = process.env.PORT || 3001

connectDB()

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
})
