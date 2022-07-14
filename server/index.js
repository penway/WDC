const mongoose           = require('mongoose')
const cors               = require('cors')
const express            = require('express')
const app                = express()
const bodyParser         = require('body-parser')
const path               = require('path')
require('dotenv').config()

const todoListRoutes     = require('./route/api/Todolist')
const partListRoutes     = require('./route/api/Partlist')

app.use(cors())  // to allow cross origin requests
app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected.'))
    .catch((err) => console.log(err))

app.use('/api/todoList', todoListRoutes)
app.use('/api/partList', partListRoutes)

app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`)
})
