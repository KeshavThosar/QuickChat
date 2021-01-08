const path = require('path');
const express = require('express');
const uuid = require('uuid');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000


app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/quick-chat/new', (req, res) => {
    res.redirect(`/quick-chat/${uuid.v4()}`)
})
app.get('/quick-chat/:room', (req, res) =>{
    res.render('chatroom', {room: req.params.room})
})
io.on('connection', (socket) =>{
    socket.on('join', ({room}) =>{
        socket.join(room)
    });
    socket.on('chat_message', (payload) =>{
        socket.to(payload.room).emit("chat_message", payload);
    })
   })


http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})