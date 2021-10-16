const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()

app.use(cors())

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

mongoose.connect('mongodb+srv://root:lottelebewohl@berkshire.tgsvp.mongodb.net/Berkshire?retryWrites=true&w=majority')

app.use(routes)

app.listen(3001, () => {
    console.log('its running lol')
})