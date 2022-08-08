const { isLoggedOut, isLoggedIn } = require('./helpers');
const view_router = require('express').Router();
const User = require('../models/User')

view_router.get('/', isLoggedIn, (req, res) => {
    const user_id = req.session.user_id;

    if (user_id) {
        return User.findOne({
            where: {
            id: user_id
            },
        attributes: ['id', 'username']
        })
        .then(user => {
            user = {
                username: user.username
            };
            res.render('index', { user });
        });
    }
  
    res.render('index');
});

view_router.get('/index', isLoggedOut, (req, res) => {
    res.render('/login', { errors: req.session.errors})
})
view_router.get('/login', isLoggedIn, (req, res) => {
    res.render('/index', { errors: req.session.errors})
})
view_router.get('/register', isLoggedIn, (req, res) => {
    res.render('/index', { errors: req.session.errors})
})

module.exports = view_router