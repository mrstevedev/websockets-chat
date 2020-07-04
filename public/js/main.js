// Init socket.io
// Load the socket.io-client, which exposes an io global (and the endpoint GET /socket.io/socket.io.js), and then connect.
const socket = io();
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat__window--chat-window')

// Get username and room from querystring 
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, room)

// Catch emitted message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message Submit 
chatForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // Get message text 
    const message = event.target.elements.msg.value

    // console.log(message)
    // Emitting a message to the server
    socket.emit('chatMessage', message)

})

// Output message to DOM 
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('chat__window--chat', 'animated', 'animatedFadeInUp', 'fadeInUp')
    div.innerHTML = `<div class="chat__window--timestamp-name">
    <p>${message.username} ${ message.time }</p>
    </div>
    <p class="chat__window--text">${ message.text }</p>`

    document.querySelector('.chat__window--chat-window').appendChild(div)

}

