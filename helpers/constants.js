const userSubscription = ['free', 'pro', 'premium']

const UserSchema = {
  subscription: {
    ENUM: userSubscription,
    DEFAULT: userSubscription[0],
  },
}

module.exports = { UserSchema }
