const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
      required: [true, 'Вы должны ввести имя контакта'],
    },
    email: {
      type: String,
      min: 3,
      max: 50,
      required: [true, 'Вы должны ввести емеил контакта'],
      unique: true,
    },
    phone: {
      type: String,
      min: 1,
      max: 50,
    },
    subscription: {
      type: String,
      default: 'free',
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact
