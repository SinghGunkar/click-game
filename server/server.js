'use strict'

const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Game = require('./game')

const app = express()

const clientPath = `${__dirname}/../client`
console.log(`Serving static from ${clientPath}`)

app.use(express.static(clientPath))

const server = http.createServer(app)

const io = socketio(server)

let waitingPlayer = null

io.on('connection', (socket) => {
    console.log(`Socket with id ${socket.id} has connected`)

    if (waitingPlayer) {
        // start a game
        new Game(waitingPlayer, socket)
        waitingPlayer = null
    } else {
        waitingPlayer = socket
        waitingPlayer.emit('waitMessage', 'Waiting for an opponent')
    }
})

server.on('error', (err) => {
    console.log("Server error:")
})

const PORT = process.env.PORT || 3000
const INDEX = '/index.html'

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
    console.log('______________________')
})