var expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message.js');
describe('Generate Message',() =>{
	it('should generate message',() => {
		var {from,text,createdAt} = generateMessage("admin","This is a test case");
		expect(from).toBe("admin");
		expect(text).toBe("This is a test case");
		expect(createdAt).toBeA("number");
	})
})

describe('Generate Location Message',() =>{
	it('should generate Location URL',() => {
		var coords = {
			latitude:22.69409,
			longitude:75.85906
		}
		var {url,createdAt} = generateLocationMessage(coords.latitude,coords.longitude);
		expect(url).toBe(`https://www.google.co.in/maps?q=${coords.latitude},${coords.longitude}`);
		expect(createdAt).toBeA("number");
	})
})