// In this app we're going to use Socket IO which lets two way communication between client and server. It has both front end and back end libraries we'll use both to set up chat app.
// at the backend Express uses http module to setup http server
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var app = express();
const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const path = require('path');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath)); 
// console.log(__dirname+'/../public');
// console.log(publicPath);
var server = http.createServer(app);  // As http server is used behind the scenes by Express, we can pass app directly to server
var io = socketIO(server); 		// we get back web socket server, this helps us communicating between server and clients. Thsi handles whenever client/browser gets disconnected
var users = new Users();

io.on('connection',function(socket){
	console.log("New user connected"); // This is called whenevr browser is refreshed or new tab is opened for this index
	
	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name)||!isRealString(params.room)){
			return callback("Name and room name are reuired");
		}
		socket.join(params.room);
		// socket.leave(params.room);
		//io.emit => io.to('Group name').emit() to everybody in the given the group
		// socket.broadcast.emit -> socket.broadcast.to('Group name').emit to everybody in the given the group except the current socket(user)
		// socket.emit
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);
		var ActiveUsers = users.getUserList(params.room);
		io.to(params.room).emit('updateUsersList',ActiveUsers);
		socket.emit('newMessage',generateMessage("Admin","Welome to the chat room"));// This emits the message, to the user who got connected!);
		socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`${params.name} has joined`));// This broadcasts the message, emits only to other clients except the client just connected to the socket, socket specifies just connected user
		callback();
		
	});
	
	//Got the message from users and forwarding it to all other users
	socket.on('createMessage',(message,callback) => {
	console.log("New Message sent by client",message);
	var currentuser = users.getUser(socket.id);
	
	io.to(currentuser.room).emit('newMessage',generateMessage(currentuser.name,message.text)); // io.emit emits to all connected client while socket.emit emits  only to the socket who sent the message 
	//Emit is used to send an event named 'newMessage' the same event name has to be used client side to listen to this event. Also this doesn't have any callback function as we're not listening to the event but we have to specify the data to be sent to the client
	callback("Message Received by server");
	});
	
	//Got the Location message from users and forwarding it to all other users
	socket.on('createLocationMessage',(coords,callback) => {
	var currentuser = users.getUser(socket.id);
	
	io.to(currentuser.room).emit('newLocationMessage',generateLocationMessage(currentuser.name,coords.latitude,coords.longitude)); // io.emit emits to all connected client while socket.emit emits  only to the socket who sent the message 
	callback("Message Received by server");
	});
	
	socket.on('disconnect',function(){    // This is called whenever browser is closed, socket is closed
	var currentuser = users.removeUser(socket.id);
	if(currentuser){
		var ActiveUsers = users.getUserList(currentuser.room);
		io.to(currentuser.room).emit('updateUsersList',ActiveUsers);
		io.to(currentuser.room).emit('newMessage',generateMessage("Admin",`${currentuser.name} has left`)); // This broadcasts the message, emits only to other clients except the client just connected to the socket, socket specifies just connected user	
	
	}
	});
});

server.listen(port,()=>{		//app is replaced by app
	console.log('Started on port '+port);
});


