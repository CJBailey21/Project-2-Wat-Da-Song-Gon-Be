const user_router = require('express').Router();
const User = require('../models/User')
const Post = require('../models/Post')
const { isLoggedIn } = require('./helpers')


// shows followers of user
// User.findByPk(1, { 
//     include: 'followers'
//  }).then(user => {
//     console.log(user.followers);
//  })

 //logged in user, grab object of logged in, grab object of followed user, user object of followed: call .addFollower, pass in logged in user to method
 


 user_router.post('/', isLoggedIn, async (req, res) => {
   const user_id = req.session.user_id
   User[user_id].addPost()
 })
 
 user_router.delete('/:id', isLoggedIn, async (req, res) => {
   post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(post => {
      res.json(post)
    })
    .catch(err => {
      console.log(err);
    })
 });
 
module.exports = user_router