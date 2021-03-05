const UserSchema = {
  subscription: {
    ENUM: ['free', 'pro', 'premium'],
    DEFAULT: 'free',
  },
}

module.exports = { UserSchema }
