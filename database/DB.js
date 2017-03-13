//The first part of the code also exsist in the app.js
//I wrote it here aswell so I can run this script independantly from
//the app.js. To test the database.
const sequelize = require('sequelize')
let db = {} 

	db = new sequelize( 'blogdb', 'postgres', 'password',{
		host: 'localhost',
		dialect: 'postgres'
	})


	//Create the users table.
	db.User = db.define( 'user', {
		firstname: sequelize.STRING,
		lastname: sequelize.STRING,
		email: sequelize.STRING,
		password: sequelize.STRING,
		username: sequelize.STRING,
	})

	//Create the posts table.
	db.Post = db.define( 'post', {
		title: sequelize.STRING,
		post: sequelize.STRING,
	})

	//Create the comments table.
	db.Comment = db.define( 'comment', {
		comment: sequelize.STRING
	}) 
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


//The relations between the tabels and the injection
//of demo data are wrapped in a function so they can be exported
//to the app.js

	//Relation between user and post tables.
	db.Post.belongsTo(User)
	db.User.hasMany(Post)

	//Relation between post and comment tables.
	db.Post.hasMany(Comment)
	db.Comment.belongsTo(Post)

	//Relation between user and comment.
	db.Comment.belongsTo(User)
	db.User.hasMany(Comment)
	
function DBfunction() {
	///Demo data
	///This does work. The first part is mine.
	db.sync({force: true}).then( done => {
		return Promise.all([
			//demo data in user table
			db.User.create({
				firstname: 'Dhova',
				lastname: 'Kin',
				email: 'dragon@gmail.com',
				password: 'werewolf',
				username: 'DhovaKing'
			}),
			db.User.create({
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
}

//This module is executed in the app.js file.
module.exports = db
module.exports.DBfunction = DBfunction









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