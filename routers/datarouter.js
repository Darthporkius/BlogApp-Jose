const express = require('express')
const bodyparser = require('body-parser')

const router = express.Router()

var activeUsername


//These routes will be handeled by the router.
router.get('/home', function (req,res) {
	res.render('home', {
		username: activeUsername
	})
})

router.get('/mypost', function (req,res) {
	res.render('myPosts')
})

router.get('/allposts', function (req,res) {
	res.render('allPosts')
})

router.get('/newpost', function (req,res) {
	res.render('newpost')
})
/////////

module.exports = {
	router: router,
	activeUsername: activeUsername
}
