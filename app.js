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
	//	 req.body.password == users.password)

	console.log('Login post body is ', req.body)
	//Test session.
	console.log(req.session)
	req.session.activeUser = req.body.username
	res.render('home', {
		username: req.session.activeUser
	})
	//else res.render('login')
})


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

app.get('/register', function (req,res) {
	res.render('register')
})

/////////The router/////////
//Username is the username of the current loggedin user.
app.use('/username', routers)


//Server 
app.listen(3000, function( ) {
	console.log('Server Running')
})
