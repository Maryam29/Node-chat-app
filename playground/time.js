//Time in milisec added to Jan 1st 1970 00:00:00am, it doesn't support dattime formatting so, we are using 'moment' library
//var date = new Date();
// console.log(date.getMonth());
const moment = require('moment');
var date = moment() //represents current moment of time
//console.log(date.format('MMM'));
console.log(date.format('dddd, MMM-Do,YYYY'));
date.add(1,'y').subtract(9,'months');
console.log(date.format('dddd, MMM-Do,YYYY'));

//10:35 am padded mins and unpaded hours
console.log(date.format("h:mm a"));
var createdAt = 1234
var date1 = moment(createdAt);
console.log(date1.format('dddd, MMM-Do,YYYY'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);