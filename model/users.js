const User = require('./schemas/userSchema')

const create = async (email, password) => {
  const user = await new User({ email, password })
  return user.save()
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

module.exports = {
  create,
  findByEmail,
}
