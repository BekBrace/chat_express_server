// Client Code

document.addEventListener('DOMContentLoaded', () => {

// Establish a connection to the server using Socket.io
const socket = io();

// Flag to track if the user is currently typing
let typing = false;

// Event handler for the form submission
document.querySelector('form').addEventListener('submit', (event) => {

// Emit a 'stop typing' event and send the chat message to the server
socket.emit('stop typing');
socket.emit('chat message', document.getElementById('m').value);

// Clear the input field
document.getElementById('m').value = '';

// Prevent the form from submitting and refreshing the page
event.preventDefault();

});

// Event handler for the input field when the user is typing
document.getElementById('m').addEventListener('input', () => {
  // If the user starts typing, emit a 'typing' event to the server
  if (!typing) {
    typing = true;
    socket.emit('typing');
  }

// Set a timeout to emit 'stop typing' after 1000 milliseconds (1 second)
  setTimeout(() => {
    typing = false;
    socket.emit('stop typing');
  }, 1000);
});

  // Event listener for receiving chat messages from the server
  socket.on('chat message', (msg) => {
    // Display the chat message in the messages list
    const li = document.createElement('li');
    const userClass = msg.user.replace(/\s+/g, '_'); // Replace spaces with underscores
    li.classList.add(userClass);
    li.textContent = `${msg.user}: ${msg.message}`;
    document.getElementById('messages').appendChild(li);

    // Remove the typing indicator when a message is received
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  });

    // Event listener for receiving 'typing' events from other users
  socket.on('typing', (user) => {
    // Display a typing indicator in the messages list
    const li = document.createElement('li');
    // Replace spaces with underscores
    const userClass = user.replace(/\s+/g, '_'); 
    li.classList.add('typing-indicator', userClass);
    li.textContent = `${user} is typing...`;
    document.getElementById('messages').appendChild(li);
  });

    // Event listener for receiving 'stop typing' events from other users
  socket.on('stop typing', () => {
    // Remove the typing indicator when a user stops typing
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  });
});