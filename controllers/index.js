const router = require('express').Router()
const view_routes = require('./view_routes')
const auth_routes = require('./auth_routes')
const user_routes = require('./user_routes')

router.use('/views', view_routes)
router.use('/auth', auth_routes)
router.use('/user', user_routes)

module.exports = router