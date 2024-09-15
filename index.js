const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const routes = require('./routes/routes');

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database')
}).catch(err => {
    console.error('Database connection error:', err)
})

const app = express()

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json())

app.use('/api', routes)

app.listen(8000, () => {
    console.log('Server running on port 8000')
})