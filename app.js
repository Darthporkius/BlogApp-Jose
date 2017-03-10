const express = require('express')
const session = require('express-session')
const routers = require( __dirname + '/routers/datarouter')
const fs = require('fs')
const bodyparser = require('body-parser')

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

app.use( bodyparser.urlencoded( { extended: true}))


//Display home screen.
app.get('/', function (req,res) {
	res.render('login')
})

//////////////////////////////////////////////////////////
////////login code////////////////////////////////////////

app.post('/login', function(req,res){
	//if (req.body.username == users.username && 
	//	 req.body.password == users.password) { 
	//				
	//}

	//Test req.body
	console.log('Login post body is ', req.body)
	//Test session.
	console.log(req.session)

	//Pass form username into req.session.activeUser
	req.session.activeUser = req.body.username

	//This will then render the home page after the username and
	//the password are confirmed. 
	res.render('home', {
		username: req.session.activeUser
	})
	//This is what happends if the login fails.
	//else { res.render('login', {
	//			loginfail: 'Username or password not found.' 
	//}) }
})


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

app.get('/register', function (req,res) {
	res.render('register')
})

/////////The router/////////
//Username is the username of the current loggedin user.
app.use('/username', routers)

//The logout
// //THis does not yet work.///
// //Destroy the session uppon logout.
// app.post('/logout', 
// 	req.session.destroy(function (err){
// 		res.render('login')
// 	}))
// ////


//Server 
app.listen(3000, function( ) {
	console.log('Server Running')
})
