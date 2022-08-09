const user_router = require('express').Router();
const User = require('../models/User')


// shows followers of user
User.findByPk(1, { 
    include: 'followers'
 }).then(user => {
    console.log(user.followers);
 })

module.exports = user_router