var socket = io(); // method available to socket.io.js file, we're initiating the request we're making a request from the client the the server to open up a web socket and keep that connection open. This handles whenever server is connected or disconnected
// Arrow function may not work in IE or Safari , it may work well in chrome, so avoid using that.
socket.on('connect',function(){
console.log("Connected to server");

socket.emit('createMessage',{
	to:"mike@gmal.com",
	text:"I'm very well, Thank You"
})
});

socket.on('newMessage',function(email){
	console.log("New Message Received");
	console.log(JSON.stringify(email));
});

socket.on('disconnect',function(){
console.log("disconnected from server");
});
