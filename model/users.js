const User = require('./schemas/userSchema')

const create = (email, password) => {
  const user = new User({ email, password })

  return user.save()
}

const findById = (id) => {
  return User.findOne({ _id: id })
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

const updateToken = (id, token) => {
  return User.updateOne({ _id: id }, { token })
}

const updateSubscription = (id, subscription) => {
  return User.updateOne({ _id: id }, { subscription })
}

module.exports = {
  create,
  findById,
  findByEmail,
  updateToken,
  updateSubscription,
}
