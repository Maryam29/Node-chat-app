
class Users{
	constructor(){
		this.users = [];
	}
	addUser(id,name,room){
		var user = {id,name,room};
		this.users.push(user);
		return user;
	}
	removeUser(id){
		// this.users = this.users.filter((user)=>{
			// return user.id != id
		// });
		// //console.log(this.users)
		// return this.users;
		var user = this.getUser(id);
		if(user){
			this.users = this.users.filter((user)=>{
			return user.id != id
		});
		}
		return user;
	}
	getUser(id){
		return this.users.filter((user)=>{
		return user.id === id
		})[0];
	}
	getUserList(room){
		//console.log(this.users);
		var roomusers = this.users.filter((user)=>{
			return user.room === room
		});
		//console.log(roomusers);
		var namesarray = roomusers.map((user)=>{
			return user.name;
		});
		return namesarray;
	}
}
// var users=new Users();
// users.users=[{
		// id:'123',
		// name:'Andrew',
		// room:'NodeJS'
	// },{
		// id:'12',
		// name:'Jen',
		// room:'DeepLearning'
	// },{
		// id:'124',
		// name:'Mike',
		// room:'NodeJS'
	// }]
	// console.log(users.users);
// console.log(users.removeUser('123'));
module.exports = {Users};