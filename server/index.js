const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const PORT = process.env.PORT || 5000
const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, cb) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return cb(error)

        socket.broadcast.to(user.room).emit('message', { user: 'chatbot', text: `User ${user.name} has joined the room.` })
        socket.emit('message', { user: 'chatbot', text: `Welcome to this room, ${user.name}!` })
        
        socket.join(user.room)
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })        
        
        cb()
    })

    socket.on('sendMessage', (msg, cb) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: msg })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })        
        
        cb()
    })

    socket.on('disconnect', () => { 
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', { user: 'chatbot', text: `${user.name} has left the room.` })
        }
    })
})

app.use(router)
server.listen(PORT, console.log(`server has started on ${PORT}`))