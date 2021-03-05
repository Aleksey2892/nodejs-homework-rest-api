require('dotenv').config()
const Users = require('../model/users')
const HttpCodes = require('../helpers/httpCodes')

const register = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await Users.findByEmail(email)

    if (user) {
      return res.status(HttpCodes.CONFLICT).json({
        message: 'Email in use',
      })
    }

    const newUser = await Users.create(email, password)
    return res.status(HttpCodes.CREATED).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { register }
