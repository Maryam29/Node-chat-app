const moment = require('moment');
var generateMessage = function(from,text){
	return {
		from,
		text,
		createdAt: moment().valueOf()
			};
	};
var generateLocationMessage = function(latitude,longitude){
	return {
		from:'User',
		url:`https://www.google.co.in/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
		};
	};
module.exports = {generateMessage,generateLocationMessage};