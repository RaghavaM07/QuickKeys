require('dotenv').config()
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const { generateUsername } = require("unique-username-generator");
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const connectDB = require('./connectDB')

const Result = require('./models/result.model')
const Highscore = require('./models/highscores.model')
const Gameroom = require('./models/gameroom.model')

app.use(cors())
app.use(express.json())

app.get('/api/newUsername', (req, res) => {
	const username = generateUsername("", 3)
	res.json({ username })
})

const usersMap = {}
app.post('/api/newRoom', async (req, res) => {
	const { username, difficulty } = req.body

	const runTime = {
		'EASY': 90*1000,
		'MEDIUM': 180*1000,
		'HARD': 240*1000
	}

	const roomId = uuidv4().toString()

	const para = require('./paragraphs').getPara(difficulty)

	const newRoom = await Gameroom.create({
		creator: username,
		roomId,
		endBy: Date.now() + runTime[difficulty] + 60*1000,
		para
	})

	usersMap[roomId] = {}

	res.json({ newRoom })
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
	} else if (currHigh.resultId.speed <= result.speed) {
		await Highscore.findOneAndUpdate({username}, {resultId: result._id})
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

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: '*'
	}
})

httpServer.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
})

io.on('connection', (socket) => {
	console.log(`Socket ID ${socket.id} connected`)

	socket.on('join', async (data) => {
		const { roomId, username } = data

		const theRoom = await Gameroom.findOne({ roomId })

		if (Date.now() >= theRoom.startBy) {
			socket.emit('already_started', { roomId })
			return
		}
		else {
			socket.join(roomId)
			
			const list = []
			list.push({username, accuracy:0, speed:0})
			const u = Object.keys(usersMap[roomId])
			u.map(name => list.push({username: name, accuracy: 0, speed: 0}))
			
			
			socket.emit('getRoom',{ room: theRoom, list })
			
			usersMap[roomId][username] = socket.id
			socket.to(roomId).emit('new_member', { username, list })
			console.log("lafoot: ", usersMap[roomId]);
		}
	})

	socket.on('updateScore', data => {
		const { roomId, newScore, username } = data
		console.log("newscore",newScore)
		socket.to(roomId).emit('someones_score_update', {  newScore, username })
	})
})
