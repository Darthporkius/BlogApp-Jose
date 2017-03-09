const express = require('express')
const routers = require( __dirname + '/routers/datarouter')
const fs = require('fs')
const bodyparser = require('body-parser')

const app = express()

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

////////////////////////////
////////login code//////////
var activeUsername = "Darthporkius"

app.post('/login', function(req,res){
	// console.log(reg.body.username)
	// console.log(reg.body.password)
	res.render('login')
})

////////////////////////////
////////////////////////////

app.get('/register', function (req,res) {
	res.render('register')
})

/////////The router/////////
//Username is the username of the current loggedin user.
app.use('/username', routers)

//exporting the username so it can be used in the 
//home page.
module.exports.activeUsername = activeUsername



//Server 
app.listen(3000, function( ) {
	console.log('Server Running')
})
