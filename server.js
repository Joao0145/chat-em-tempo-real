const express = require('express');
const http = require('htpp');
const socketIo = require('socket.io');
const mongoose = require('mongose');

const app = express();
const server = htpp.creatServer(app);
const io = socketIo(server);

mongoose.connect('mongobd://localhost/chat', { userNewUrlParser: true, userUnifiedTopology: true });

// Modelo de mensagem
const Message = mongoose.model('Message', new mongoose.Schema({
    username: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
}));

app.use(express.static('public'));
io.on('connection', (socket) => {
    console.log('Novo usuario conectado');

    //Enviar mensagens antigas ao novo usuario

    Message.find().then(messages => {
        socket.emit('previousMessages', messages);
    });

    socket.on('sendMessage', (data) => {
        const message = new Message(data);
        message.save().then(() => {
            io.emit('receiveMessage', data);
        });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

});

server.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
});