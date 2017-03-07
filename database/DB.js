const sequelize = require('sequelize')
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

//Relation between user and post tables.
Post.belongsTo(User)
User.hasMany(Post)

//Relation between post and comment tables.
Post.hasMany(Comment)
Comment.belongsTo(Post)

//Relation between user and comment.
User.hasMany(Comment)

db.sync( {force: true})

