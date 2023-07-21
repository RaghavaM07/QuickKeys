const mongoose = require('mongoose')

const URI = process.env.MONGO_URI

const connectDB = () => mongoose.connect(URI).then(console.log('Connected to DB'))

module.exports = connectDB
