const express = require('express')
const router = express.Router()
const Contacts = require('../../model')
const HttpCodes = require('../../helpers/httpCodes')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()

    return res.status(HttpCodes.OK).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contact = await Contacts.getContactById(contactId)

    if (contact) {
      return res.status(HttpCodes.OK).json(contact)
    } else {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { body } = req

  try {
    const newContact = await Contacts.addContact(body)

    if (newContact) {
      return res.status(HttpCodes.CREATED).json(newContact)
    } else {
      return res
        .status(HttpCodes.BAD_REQUEST)
        .json({ message: 'missing required name field' })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  try {
    const isDeletedContact = await Contacts.removeContact(contactId)

    if (isDeletedContact) {
      res.status(HttpCodes.OK).json({ message: 'contact deleted' })
    } else {
      res.status(HttpCodes.NOT_FOUND).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  const { params, body } = req
  const { contactId } = params

  try {
    const updatedContact = await Contacts.updateContact(contactId, body)

    if (updatedContact) {
      return res.status(HttpCodes.OK).json(updatedContact)
    } else {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
