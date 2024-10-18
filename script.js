const socket = io();


const messageDiv = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

sendButton.addEventListener('click', () => {
    const message = {
        username: usernameInput.value,
        text: messageInput.value
    };
socket.emit('sendMessage', message);
messageInput.value = '';

});



socket.on('previousMessages', (messages) => {
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.innerText = `${message.username}: ${message.text}`;
        messagesDiv.appendChild(messageElement);
    });
});