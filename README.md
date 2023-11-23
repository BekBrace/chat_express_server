Simple Chat Application with Socket.io

![node](https://github.com/BekBrace/chat_express_server/assets/60483846/c36cdd9f-8b67-4397-8d15-2cd6cea41612)


This is a basic chat application built using Node.js, Express, and Socket.io. 

The application allows users to connect to a chat room, send messages, and receive real-time updates about other users' activities.

Installation
To run the application locally, follow these steps:

Clone the repository:

```
bash
git clone https://github.com/your-username/simple-chat-app.git](https://github.com/BekBrace/chat_express_server.git
```

Navigate to the project directory:

```
bash
cd simple-chat-app
```

Install dependencies:
```
bash
npm install
```

Usage
To start the server and run the chat application, use the following command:

```
bash
npm start
```

The server will start at http://localhost:3000. Open this URL in your web browser to access the chat application.

Features
Users are assigned a unique username based on the order of connection.
Real-time broadcasting of user connections and disconnections.
Users can send chat messages to the entire chat room.
Typing indicators to show when a user is typing.
How It Works
Server Setup: The server is created using Express and Socket.io.

Static Files: Static files (HTML, CSS, JS) are served from the public folder.

Connection Event: When a user connects, a unique username is assigned, and a connection message is broadcasted to all users.

Chat Events: Users can send chat messages, and these messages are broadcasted to all connected users.

Typing Events: Typing and stop typing events are broadcasted to inform others when a user is typing.

Disconnection Handling: When a user disconnects, a disconnection message is broadcasted.

Contributing
If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and submit a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
This chat application is built using Express and Socket.io.
Special thanks to the open-source community for their contributions.
Feel free to customize and enhance this chat application based on your needs!
