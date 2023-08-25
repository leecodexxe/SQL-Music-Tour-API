// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')

const bandsController = require('./controllers/bands_controller')
const eventsController = require('./controllers/events_controllers')
const stagesController = require('./controllers/stages_controller')
// //sequelize connection
// const sequelize = new Sequelize({
//     storage: process.env.PG_URL,
//     dialect: 'postgres',
//     username: 'postgres',
//     password: 'UNLV123',
// });

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/bands',bandsController)
app.use('/events', eventsController)
app.use('/stages', stagesController)

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})