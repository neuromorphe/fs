const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
    console.log('Новый пользователь подключился');

    // Отправляем историю сообщений новому пользователю
    socket.emit('load messages', messages);

    socket.on('send message', (data) => {
        messages.push(data);
        io.emit('new message', data);
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

const PORT = process.env.PORT || 13381;
server.listen(PORT, '150.241.114.194', () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
