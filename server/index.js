const mongoose           = require('mongoose')
const cors               = require('cors')
const express            = require('express')
const app                = express()
const bodyParser         = require('body-parser')
require('dotenv').config()

const partRoutes     = require('./route/api/Partlist')
const projectRoutes     = require('./route/api/ProjectAPI')

app.use(cors())  // to allow cross origin requests
app.use(bodyParser.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected.'))
    .catch((err) => console.log(err))

app.use('/api/part/', partRoutes)
app.use('/api/project/', projectRoutes)

app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`)
})
