const sequelize = require('sequelize')
const db = new sequelize( 'blogdb', 'postgres', 'password',{
	host: 'localhost',
	dialect: 'postgres'
})

//Create the users table.
const User = db.define( 'user', {
	firstname: sequelize.STRING,
	lastname: sequelize.STRING,
	email: sequelize.STRING,
	password: sequelize.STRING,
	username: sequelize.STRING,
})

//Create the posts table.
const Post = db.define( 'post', {
	title: sequelize.STRING,
	post: sequelize.STRING,
})

//Create the comments table.
const Comment = db.define( 'comment', {
	comment: sequelize.STRING
}) 

//Relation between user and post tables.
Post.belongsTo(User)
User.hasMany(Post)

//Relation between post and comment tables.
Post.hasMany(Comment)
Comment.belongsTo(Post)

//Relation between user and comment.
Comment.belongsTo(User)
User.hasMany(Comment)

///Demo data
///This does work. The first part is mine.
db.sync({force: true}).then( done => {
	return Promise.all([
		//demo data in user table
		User.create({
			firstname: 'Dhova',
			lastname: 'Kin',
			email: 'dragon@gmail.com',
			password: 'werewolf',
			username: 'DhovaKing'
		}),
		User.create({
			firstname: 'Bruce',
			lastname: 'Banner',
			email: 'prof_Banner@hotmail.com',
			password: 'Skaar#Betty',
			username: 'NerdRage'
		})
	])
///The 
}).then( users => {
	return Promise.all([
		//Demo data belonging to the first user.
		users[0].createPost({
			title: "Learned new shout.",
			post: "Wuld!!"
		}).then(comment=> {
			comment.createComment({
				comment: 'Cool story bro.'
			}).then(thecomment => {
				thecomment.setUser(users[0])
			})
		}),

		//Demo data belonging to the second user.
		users[1].createPost({
			title: "Angry.",
			post: "Betty where"
		}).then(comment=> {
			comment.createComment({
				comment: 'Ross sux.'
			}).then(thecomment => {
				thecomment.setUser(users[1])
			})
		})
	])
} )



////This did not work///////////////////////////
///I tried to acces 2 promise.all returns in one 
///promise but it did not work.
// //sync database and create demo data
// db.sync( {force: true}).then( function() {
// 	return Promise.all([

// 		Promise.all([
// 			//demo data in user table
// 			User.create({
// 				firstname: 'Dhova',
// 				lastname: 'Kin',
// 				email: 'dragon@gmail.com',
// 				password: 'werewolf',
// 				username: 'DhovaKing'
// 			}),
// 			User.create({
// 				firstname: 'Bruce',
// 				lastname: 'Banner',
// 				email: 'prof_Banner@hotmail.com',
// 				password: 'Skaar#Betty',
// 				username: 'NerdRage'
// 			})

// 			//demo data in post table. Two per user. 
// 		]),
// 		Promise.all([ 
// 			users[0].createPost({
// 				title: "Learnd new shout.",
// 				post: "Wuld!!"
// 			}),

// 			users[0].createPost({
// 				title: "I got married.",
// 				post: "It's Mjoll"
// 			}),
			
// 			users[1].createPost({
// 				title: "Angry.",
// 				post: "Betty where?"
// 			}),

// 			users[1].createPost({
// 				title: "Ross.",
// 				post: "Please leave me alone."
// 			})
// 		])
// 	])
// }).then( doubleresult => {
// 	console.log(doubleresult)
// } )
/////////////////////////////////////////////