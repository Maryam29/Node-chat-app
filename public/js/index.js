var socket = io(); // method available to socket.io.js file, we're initiating the request we're making a request from the client the the server to open up a web socket and keep that connection open. This handles whenever server is connected or disconnected
// Arrow function may not work in IE or Safari , it may work well in chrome, so avoid using that.
socket.on('connect',function(){
console.log("Connected to server");
});

socket.on('newMessage',function(message){
	var li = jQuery('<li></li>');
	li.text(`${message.from}:${message.text}`);
	jQuery('#messages').append(li);
});

socket.on('disconnect',function(){
console.log("disconnected from server");
});

// socket.emit('createMessage',{
	// from:"mike@gmal.com",
	// text:"Hi! My Name is Shoeb"
// },function(response){
	// console.log(response)
// });

jQuery('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
	from:"User",
	text:jQuery("[name=message]").val()
},function(response){
	console.log(response)
});
})