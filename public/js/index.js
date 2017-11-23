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

socket.on('newLocationMessage',function(message){
	var li = jQuery('<li></li>');
	var a = jQuery(`<a target="_blank">My Current Location</a>`);
	console.log(message.url);
	a.attr('href', message.url);
	li.text(`${message.from}:`);
	li.append(a);
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
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}
	navigator.geolocation.getCurrentPosition(function(position){
		//console.log(position);
		socket.emit('createLocationMessage',{
			longitude: position.coords.longitude,
			latitude: position.coords.latitude
		},function(response){
	console.log(response)
});
	},function(){
		alert('Unable to fetch location.')
	})
})