var expect = require('expect');
const {generateMessage} = require('./message.js');
describe('Generate Message',() =>{
	it('should generate message',() => {
		var {from,text,createdAt} = generateMessage("admin","This is a test case");
		expect(from).toBe("admin");
		expect(text).toBe("This is a test case");
		expect(createdAt).toBeA("number");
	})
})