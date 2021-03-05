const User = require('./schemas/userSchema')

const create = (email, password) => {
  const user = new User({ email, password })
  return user.save()
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

module.exports = {
  create,
  findByEmail,
}
