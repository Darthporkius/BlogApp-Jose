const express = require('express')
// const routers = require( __dirname + '/routers/datarouter')
const fs = require('fs')
const bodyparser = require('body-parser')

const app = express()

//Set view engine and pug file.
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use( bodyparser.urlencoded( { extended: true}))


//Display home screen.
app.get('/', function (req,res) {
	res.render('login')
})

app.get('/register', function (req,res) {
	res.render('register')
})






//These routes will be handeled by the router.
app.get('/home', function (req,res) {
	res.render('home')
})

app.get('/mypost', function (req,res) {
	res.render('myPosts')
})

app.get('/allposts', function (req,res) {
	res.render('allPosts')
})

app.get('/newpost', function (req,res) {
	res.render('newpost')
})
/////////


//Server 
app.listen(3000, function( ) {
	console.log('Server Running')
})
