const express = require('express')
const routers = require( __dirname + '/routers/datarouter')
const fs = require('fs')
const bodyparser = require('body-parser')

const app = express()

//Set view engine and pug file.
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use( bodyparser.urlencoded( { extended: true}))

routers.activeUsername = "Darthporkius"

//Display home screen.
app.get('/', function (req,res) {
	res.render('login', {
		user: routers.activeUsername
	})
})


////////login code//////////
// app.post('/login', function(req,res){
// 	// console.log(reg.body.username)
// 	// console.log(reg.body.password)
// 	res.render('login')
// })




app.get('/register', function (req,res) {
	res.render('register')
})

/////////The router/////////
//Username is the username of the current loggedin user.
app.use('/username', routers.router)










//Server 
app.listen(3000, function( ) {
	console.log('Server Running')
})
