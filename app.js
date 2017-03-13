const express = require('express')
const session = require('express-session')
const fs = require('fs')
const bodyparser = require('body-parser')
const sequelize = require('sequelize')
const pg = require('pg')

//The modules
const routers = require( __dirname + '/routers/datarouter')
//const database = require( __dirname + '/database/DB')



////////////////////Database//////////////////////////////////
//////////////////////////////////////////////////////////////
//Establish connection to database.
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

//Populate tables.
//database.DBstart()

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
///create users
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
///Then fill in data for each demo user. 
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
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


//Initiate the app with express.
const app = express()

//Start session
app.use(session({
	secret: 'Hiro-Kala',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		//This is one hour in milliseconds.
		maxAge: 1000 * 60 * 60
	}
}))

//Set view engine and pug file.
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

//Use jquery
app.use( '/static', express.static( __dirname + '/static'))

//Use bodyparser
app.use( bodyparser.urlencoded( { extended: true}))


//Display login screen as root.
app.get('/', function (req,res) {
	res.render('login')
})


//////////////////////////////////////////////////////////
////////login code////////////////////////////////////////
app.post('/login', function(req,res){
	User.findOne( {
		where: {
			username: req.body.username
		}
	}).then( function(user) {
		
		if ( req.body.password == user.password ) { 

			//Pass form username into req.session.activeUser
			req.session.activeUser = req.body.username

			//This will then render the home page after 
			//the username and the password are confirmed. 
			res.render('home', {
				username: req.session.activeUser
			}) 
		}
		//This is what happends if the username is found but
		//not the password.
		else { 
			res.render('login', {
				loginfail: 'Password is not correct.' 
			}) 
		}
	})
	//If no username is found it will return nul and crash the app
	//this catch will conpensate for that and reload the login page.
	.catch( function(error) {
		console.log(error)
		return res.render('login', {
				loginfail: 'Username or password not found.' 
		}) 
	})
})
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////
/////////////////register code////////////////////////////
app.get('/register', function (req,res) {
	res.render('register')
})

//The findOrCreate method will find check if certain elements
//already exist. If they do it will not create a new user. Else
//it will create the new user.
app.post('/register', function (req,res) {
	User.findOrCreate({
		//It checks if the entered username and password are available. 
		where: {
			username: req.body.username,
			password: req.body.password
		},
		defaults: {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email
		}
	}).spread( function(user, created) {
		console.log(user.get({
			plain: true
		}))
		console.log(created)
		if (created == true) {
			res.render('login', {
			registersucces: 'Registration Successful'
			})
		} else {
			res.render('login', {
			registersucces: 'Registration Failed. Username and/or password already in use.'
			})
		}
	})
})
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


/////////The router/////////
//Username is the username of the current loggedin user.
app.use('/username', routers)

////The logout
app.post('/logout', function (req,res) {
	req.session.destroy()
	console.log('Session terminated')
	res.render('login')
	console.log(req.session)
})
//////////


//Server 
app.listen(3000, function( ) {
	console.log('Server Running')
})
