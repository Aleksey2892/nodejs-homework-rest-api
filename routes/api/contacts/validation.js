const Joi = require('joi')
const HttpCodes = require('../../../helpers/httpCodes')

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().alphanum().min(1).max(50).optional(),
  subscription: Joi.string().alphanum().optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().min(3).max(50).optional(),
  phone: Joi.string().alphanum().min(1).max(50).optional(),
  subscription: Joi.string().alphanum().optional(),
})

module.exports.schemaCreateContact = (req, _res, next) => {
  const { body } = req

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' })
  }

  const { error } = schemaCreateContact.validate(body)

  if (error) {
    const [{ type, path, message }] = error.details

    return next({
      status: HttpCodes.BAD_REQUEST,
      message:
        type === 'any.required'
          ? `missing required ${path[0]} field`
          : message.replace(/"/g, ''),
    })
  } else {
    next()
  }
}

module.exports.schemaUpdateContact = (req, _res, next) => {
  const { body } = req

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' })
  }

  const { error } = schemaUpdateContact.validate(body)

  if (error) {
    const [{ message }] = error.details

    return next({
      status: HttpCodes.BAD_REQUEST,
      message: message.replace(/"/g, ''),
    })
  } else {
    next()
  }
}
