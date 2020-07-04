const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatBot'

// Run when a client connects
// Listens for an event called 'connection'
io.on('connection', (socket) => {
    console.log('New WS Connection..')

    // Emit to client from server 
    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to chat.io'))

    // Broadcast when a user connects 
    // The difference between socket.emit and socket.broadcast.emit() is that is broadcasts to
    // everyone BUT the user 
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'))

    // Runs when client disconnects 
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'))
    })

    // Listen for chatMessage 
    socket.on('chatMessage', (msg) => {
        // console.log(msg)
        // Emit to everyone
        io.emit('message', formatMessage('User', msg))
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server started on port ${ PORT }`))
