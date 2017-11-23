var generateMessage = function(from,text){
	return {
		from,
		text,
		createdAt: new Date().getTime()
			};
	};
var generateLocationMessage = function(latitude,longitude){
	return {
		url:`https://www.google.co.in/maps?q=${latitude},${longitude}`,
		createdAt:new Date().getTime()
		};
	};
module.exports = {generateMessage,generateLocationMessage};