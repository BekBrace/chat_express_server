$(document).ready(() => {
    // Establish a connection to the server using Socket.io
    const socket = io();
  
    // Flag to track if the user is currently typing
    let typing = false;
  
    // Event handler for the form submission
    $('form').submit(() => {
      // Emit a 'stop typing' event and send the chat message to the server
      socket.emit('stop typing');
      socket.emit('chat message', $('#m').val());
  
      // Clear the input field
      $('#m').val('');
  
      // Prevent the form from submitting and refreshing the page
      return false;
    });
  
    // Event handler for the input field when the user is typing
    $('#m').on('input', () => {
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
      $('#messages').append($('<li>').addClass(msg.user).text(`${msg.user}: ${msg.message}`));
  
      // Remove the typing indicator when a message is received
      $('.typing-indicator').remove();
    });
  
    // Event listener for receiving 'typing' events from other users
    socket.on('typing', (user) => {
      // Display a typing indicator in the messages list
      $('#messages').append($('<li>').addClass('typing-indicator').text(`${user} is typing...`));
    });
  
    // Event listener for receiving 'stop typing' events from other users
    socket.on('stop typing', () => {
      // Remove the typing indicator when a user stops typing
      $('.typing-indicator').remove();
    });
  });