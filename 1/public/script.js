const socket = io();

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (text) {
        const data = {
            text: text,
            time: new Date().toLocaleTimeString()
        };
        socket.emit('send message', data);
        messageInput.value = '';
    }
});

socket.on('load messages', (messages) => {
    messages.forEach(msg => addMessage(msg, true));
});

socket.on('new message', (data) => {
    addMessage(data);
});

function addMessage(data, isHistory = false) {
    const div = document.createElement('div');
    div.className = isHistory ? 'message' : 'message own';
    div.innerHTML = `<strong>${data.time}</strong><br>${data.text}`;
    messagesDiv.appendChild(div);
    if (!isHistory) {
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}