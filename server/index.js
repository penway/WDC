const mongoose           = require('mongoose')
const cors               = require('cors')
const express            = require('express')
const app                = express()
const bodyParser         = require('body-parser')
const path               = require('path')
require('dotenv').config()

const partListRoutes     = require('./route/api/Partlist')
const componentRoutes    = require('./route/api/Componentlist')

app.use(cors())  // to allow cross origin requests
app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected.'))
    .catch((err) => console.log(err))

app.use('/api/part/', partListRoutes)
app.use('/api/component/', componentRoutes)

app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`)
})
