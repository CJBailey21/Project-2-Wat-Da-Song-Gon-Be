const router = require('express').Router()
const view_router = require('./view_routes')
const auth_router = require('./auth_routes')
const user_router = require('./user_routes')

router.use('/', view_router)
router.use('/auth', auth_router)
router.use('/user', user_router)

module.exports = router