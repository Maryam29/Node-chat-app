// In this app we're going to use Socket IO which lets two way communication between client and server. It has both front end and back end libraries we'll use both to set up chat app.
// at the backend Express uses http module to setup http server
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var app = express();
const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const path = require('path');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
// console.log(__dirname+'/../public');
// console.log(publicPath);
var server = http.createServer(app);  // As http server is used behind the scenes by Express, we can pass app directly to server
var io = socketIO(server); 		// we get back web socket server, this helps us communicating between server and clients. Thsi handles whenever client/browser gets disconnected

io.on('connection',function(socket){
	console.log("New user connected"); // This is called whenevr browser is refreshed or new tab is opened for this index
	
	socket.emit('newMessage',generateMessage("Admin","Welome to the chat room"));// This emits the message, to the user who got connected!);
	
	socket.broadcast.emit('newMessage',generateMessage("Admin","New User has joined"));// This broadcasts the message, emits only to other clients except the client just connected to the socket, socket specifies just connected user
		
	socket.on('createMessage',(message,callback) => {
	console.log("New Message sent by client",message);
	
	io.emit('newMessage',generateMessage(message.from,message.text)); // io.emit emits to all connected client while socket.emit emits  only to the socket who sent the message 
	//Emit is used to send an event named 'newMessage' the same event name has to be used client side to listen to this event. Also this doesn't have any callback function as we're not listening to the event but we have to specify the data to be sent to the client
	callback("Message Received by server");
	});
	
	socket.on('createLocationMessage',(coords,callback) => {
	console.log("New Message sent by client",coords);
	
	io.emit('newLocationMessage',generateLocationMessage(coords.latitude,coords.longitude)); // io.emit emits to all connected client while socket.emit emits  only to the socket who sent the message 
	callback("Message Received by server");
	});
	
	socket.on('disconnect',function(){    // This is called whenever browser is closed, socket is closed
	console.log("User disconnected");
	socket.broadcast.emit('newMessage',generateMessage("Admin","A User has left")); // This broadcasts the message, emits only to other clients except the client just connected to the socket, socket specifies just connected user	
	});
	
	
	})

app.use(express.static(publicPath));  

server.listen(port,()=>{		//app is replaced by app
	console.log('Started on port '+port);
})


