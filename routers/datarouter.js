const express = require('express')
const bodyparser = require('body-parser')

//const users = require( __dirname + '/../app')

const router = express.Router()


//These routes will be handeled by the router.
router.get('/home', function (req,res) {
	res.render('home', {
		//displays current user in home.
		username: req.session.activeUser
	})
})

router.get('/mypost', function (req,res) {
	res.render('myPosts', {
		//displays current user in home.
		username: req.session.activeUser
	})
})

router.get('/allposts', function (req,res) {
	res.render('allPosts', {
		//displays current user in home.
		username: req.session.activeUser
	}) 
})

router.get('/newpost', function (req,res) {
	res.render('newpost', {
		//displays current user in home.
		username: req.session.activeUser
	})
})
/////////

module.exports = router
