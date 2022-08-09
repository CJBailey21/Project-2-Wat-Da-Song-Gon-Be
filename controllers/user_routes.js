const user_router = require('express').Router();
const User = require('../models/User')


// shows followers of user
User.findByPk(1, { 
    include: 'followers'
 }).then(user => {
    console.log(user.followers);
 })

 //logged in user, grab object of logged in, grab object of followed user, user object of followed: call .addFollower, pass in logged in user to method


module.exports = user_router