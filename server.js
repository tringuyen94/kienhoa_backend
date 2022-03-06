require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const AppRouter = require('./routes/api')
const app = express()
const cors = require('cors')

mongoose.connect(process.env.DATABASE, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
}, () => console.log('Connected to database'))




app.use(express.json())
//fix cors
app.use(cors())
//API 
app.use('/api', AppRouter)
//serve static file
app.use(express.static('uploads'))

const PORT = 5050
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))