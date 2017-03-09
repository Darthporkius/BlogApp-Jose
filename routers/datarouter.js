const express = require('express')
const bodyparser = require('body-parser')

const users = require( __dirname + '/../app')

const router = express.Router()


//These routes will be handeled by the router.
router.get('/home', function (req,res) {
	res.render('home', {
		//displays current user in home.
		username: users.activeUsername
	})
})

router.get('/mypost', function (req,res) {
	res.render('myPosts', {
		//displays current user in home.
		username: users.activeUsername
	})
})

router.get('/allposts', function (req,res) {
	res.render('allPosts', {
		//displays current user in home.
		username: users.activeUsername
	}) 
})

router.get('/newpost', function (req,res) {
	res.render('newpost', {
		//displays current user in home.
		username: users.activeUsername
	})
})
/////////

module.exports = router
