var expect = require('expect');
const {isRealString} = require('./validation.js');

describe('Testing Validation function',() =>{
	it('String with only spaces should return false',() => {
		var string1 = isRealString("      ");
		expect(string1).toBe(false);
	})
	it('should return true as its a valid string',() => {
		var string2 =isRealString("      Hey");
		expect(string2).toBe(true);
	})
	it('should return false when number is passed',() => {
		var string3 = isRealString(123);
		expect(string3).toBe(false);
	})
})