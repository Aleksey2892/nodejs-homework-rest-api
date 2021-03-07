const Joi = require('joi')
const HttpCodes = require('../../../helpers/httpCodes')

const schemaCreateUser = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(50).alphanum().required(),
  subscription: Joi.string().alphanum().optional(),
})

const schemaLoginUser = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(50).alphanum().required(),
})

module.exports.schemaCreateUser = (req, _res, next) => {
  const { body } = req

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' })
  }

  const { error } = schemaCreateUser.validate(body)

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

module.exports.schemaLoginUser = (req, _res, next) => {
  const { body } = req

  if (Object.keys(body).length === 0) {
    return next({ status: HttpCodes.BAD_REQUEST, message: 'missing fields' })
  }

  const { error } = schemaLoginUser.validate(body)

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
