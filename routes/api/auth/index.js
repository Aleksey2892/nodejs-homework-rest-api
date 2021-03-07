const express = require('express')
const router = express.Router()
const authController = require('../../../controllers/auth')
const { schemaCreateUser, schemaLoginUser } = require('./validation')
const guard = require('../../../helpers/guard')

router
  .post('/register', schemaCreateUser, authController.register)
  .post('/login', schemaLoginUser, authController.login)
  .post('/logout', guard, authController.logout)

router.get('/current', guard, authController.current)

module.exports = router
